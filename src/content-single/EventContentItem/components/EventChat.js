import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get, isEmpty } from 'lodash';

import { baseUnit } from 'styles/theme';

import { StreamChatClient, ChatUtils } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { useAuth } from 'auth';
import { useChatContext, ConnectionStatus } from 'providers/ChatProvider';

// UI
import { Loader, Icon } from 'ui';
import { ChatError } from 'ui/chat';

import { GET_CURRENT_USER_FOR_CHAT, GET_CURRENT_USER_ROLE_FOR_CHANNEL } from '../queries';

import LiveStreamChat from './LiveStreamChat';
import DirectMessagesChat from './DirectMessagesChat';
import DirectMessagesDropdown from './DirectMessagesDropdown';

// :: Styled Components
// ------------------------

const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: ${({ theme }) => theme.card.background};
`;

const DirectMessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  background: ${({ theme }) => theme.card.background};
  box-shadow: ${({ theme }) => theme.shadow.medium};
  transform: translateX(${({ visible }) => (visible ? 0 : '130%')});
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${({ visible }) => (visible ? '0s' : '0.15s')};
`;

// :: Styled Components
// ------------------------

const ChatHeader = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: ${baseUnit(1)};
  background: ${({ theme }) => theme.chat.dmsHeader};
  border-bottom: 1px ${({ theme }) => theme.font[100]} solid;
  box-shadow: ${({ theme }) => theme.shadow.small};
`;

// Warning: Duplicated in DirectMessagesDropdown
const BackButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0.15rem;
  border: none;
  background: none;
`;

const BackIcon = styled(Icon).attrs(({ theme, name }) => ({
  name: 'angle-left',
  fill: theme.brand,
  size: 22,
}))`
  margin-bottom: 1px;
`;

const BackLabel = styled.span`
  color: ${({ theme }) => theme.link};
`;

// Main Component
// ------------------------
const EventChat = ({ event, channelId, onWatcherCountChange }) => {
  const isLoggedIn = false;
  const loading = false;
  const error = false;
  const data = {};
  const [chatClient, connectionStatus] = useChatContext();

  console.log('[EventChat] chatClient:', chatClient);
  console.log('[EventChat] connectionStatus:', connectionStatus);

  // User data
  // const { isLoggedIn } = useAuth();
  // const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT, {
  //   skip: !isLoggedIn,
  //   fetchPolicy: 'network-only',
  // });

  // console.log('[rkd] Chat user data:', data);

  // The user role query is separate and invoked manually at the right time, since
  // the channel must exist first before we can request our role in it.
  // That problem only affects the *first* user for the Event's chat.
  const [getUserRole, { loadingRole }] = useLazyQuery(GET_CURRENT_USER_ROLE_FOR_CHANNEL, {
    fetchPolicy: 'network-only',
    variables: {
      channelId,
    },
  });

  // Unused for now, since the Stream SDK provides a `role` on user objects.
  // Leaving this in but commented out for now, but we can remove if nothing
  // in the UI needs to change at this level according to role.
  // const userRole = isLoggedIn
  //   ? get(roleQueryData, 'currentUser.streamChatRole', null)
  //   : ChatRoles.GUEST;

  const currentUserId = ChatUtils.stripPrefix(get(data, 'currentUser.id'));

  // State Data
  const [channel, setChannel] = useState(null);
  const [connectionError, setConnectionError] = useState(false);

  // Direct Messages
  const [dmChannels, setDmChannels] = useState([]);
  const [dmChannelsVisible, setDmChannelsVisible] = useState([]);
  const [activeDmChannel, setActiveDmChannel] = useState(null);

  // Stream Chat Connection management
  useEffect(() => {
    if (connectionStatus === ConnectionStatus.CONNECTED) {
      console.log('[rkd] ************* Chat connected and ready to do stuff with');
    }
  }, [connectionStatus]);

  // Handle "Send a Direct Message"
  const handleInitiateDm = async (recipientUserId) => {
    // Do we already have a DM channel with this user?
    let recipientDmChannel = dmChannels.find((dm) =>
      ChatUtils.channelIncludesUser(dm, recipientUserId)
    );

    // If not, create one.
    if (!recipientDmChannel) {
      recipientDmChannel = StreamChatClient.channel('messaging', {
        members: [currentUserId, recipientUserId],
      });
      await recipientDmChannel.create();
    }

    // Is the DM channel visible? (I.e. has a recent message)
    const isChannelVisible = !!dmChannelsVisible.find(
      (dm) => dm.cid === recipientDmChannel.cid
    );

    // If not, force it to be for now.
    if (!isChannelVisible) {
      // Have to invoke with a function, since this handler is async
      // and will reference old/stale data otherwise.
      setDmChannelsVisible((prevDmChannelsVisible) => [
        ...prevDmChannelsVisible,
        recipientDmChannel,
      ]);
    }

    setActiveDmChannel(recipientDmChannel);
  };

  if (loading || loadingRole || !channel) return <Loader />;
  if (error || connectionError) return <ChatError />;

  return (
    <ChatContainer>
      <LiveStreamChat channel={channel} onInitiateDm={handleInitiateDm} />

      <DirectMessagesContainer visible={!!activeDmChannel}>
        <DirectMessagesChat channel={activeDmChannel} />
      </DirectMessagesContainer>

      {isLoggedIn && (!isEmpty(dmChannelsVisible) || activeDmChannel) && (
        <ChatHeader>
          {!activeDmChannel && <div />}
          {activeDmChannel && (
            <BackButton onClick={() => setActiveDmChannel(null)}>
              <BackIcon />
              <BackLabel>Back</BackLabel>
            </BackButton>
          )}

          <DirectMessagesDropdown
            currentUserId={currentUserId}
            channels={dmChannelsVisible}
            selectedChannel={activeDmChannel}
            onSelect={setActiveDmChannel}
          />
        </ChatHeader>
      )}
    </ChatContainer>
  );
};

EventChat.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
      })
    ),
  }),
  channelId: PropTypes.string.isRequired,
  onWatcherCountChange: PropTypes.func.isRequired,
};

EventChat.defaultProps = {};

export default EventChat;
