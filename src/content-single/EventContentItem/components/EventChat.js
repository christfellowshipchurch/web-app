import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get, isEmpty } from 'lodash';

import { baseUnit } from 'styles/theme';

import { StreamChatClient, ChatUtils, ChatRoles } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { useAuth } from 'auth';

// UI
import { Loader, Icon } from 'ui';

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
  padding: ${baseUnit(1)} ${baseUnit(2)};
  background: ${({ theme }) => theme.chat.dmsHeader};
  border-bottom: 1px ${({ theme }) => theme.font[100]} solid;
  box-shadow: ${({ theme }) => theme.shadow.small};
`;

// Warning: Duplicated in DirectMessagesDropdown
const BackButton = styled.button`
  padding: ${baseUnit(1)};
  border: none;
  background: none;
  color: ${({ theme }) => theme.link};
`;

const BackIcon = styled(Icon).attrs(({ theme, name }) => ({
  name,
  fill: theme.brand,
  size: 22,
}))``;

const BackLabel = styled.span`
  ${({ hidden }) => (hidden ? 'display: none;' : '')}
`;

// Main Component
// ------------------------

const EventChat = ({ event, channelId }) => {
  // User data
  const { isLoggedIn } = useAuth();
  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT, {
    skip: !isLoggedIn,
  });

  // The user role query is separate and invoked manually at the right time, since
  // the channel must exist first before we can request our role in it.
  // That problem only affects the *first* user for the Event's chat.
  const [getUserRole, { data: userRoleQueryData }] = useLazyQuery(
    GET_CURRENT_USER_ROLE_FOR_CHANNEL,
    {
      fetchPolicy: 'network-only',
      variables: {
        channelId,
      },
    }
  );

  const userRole = isLoggedIn
    ? get(userRoleQueryData, 'currentUser.streamChatRole', null)
    : ChatRoles.GUEST;
  console.log('[chat] 🔸 userRole:', userRole);

  // State Data
  const [channel, setChannel] = useState(null);
  const [dmChannels, setDmChannels] = useState([]);
  const [activeDmChannel, setActiveDmChannel] = useState(null);
  const currentUserId =
    isLoggedIn && data ? ChatUtils.stripPrefix(data.currentUser.id) : undefined;

  // Effects and Event Listeners
  useEffect(() => {
    const handleUserConnection = async () => {
      console.group('[chat] 🟢 handleUserConnection()');

      // Initialize user first
      const canConnectAsUser = isLoggedIn && !loading && data;

      if (canConnectAsUser && !get(StreamChatClient, 'userID')) {
        await StreamChatClient.setUser(
          ChatUtils.getStreamUser(data.currentUser),
          data.currentUser.streamChatToken
        );
      } else if (!isLoggedIn) {
        await StreamChatClient.setGuestUser({ id: 'guest' });
      }

      // Initialize channel
      const newChannel = StreamChatClient.channel('livestream', channelId, {
        parentId: get(event, 'id'),
        name: get(event, 'title'),
        startsAt: get(event, 'events[0].start'),
        endsAt: get(event, 'events[0].end'),
        uploads: false,
      });
      await newChannel.create();
      setChannel(newChannel);
      console.log('[chat] livestream channel (newChannel):', newChannel);

      if (isLoggedIn) {
        const dmChannelsResponse = await ChatUtils.getUserDirectMessageChannels();
        setDmChannels(dmChannelsResponse);
        console.groupEnd();
      }

      // Now that we're sure the channel exists, we can request the user's role for it
      if (canConnectAsUser) {
        await getUserRole();
      }

      console.groupEnd();
    };

    handleUserConnection();

    return () => {
      console.log('[chat] 🔴 Cleanup handleUserConnection 🧹');
      StreamChatClient.disconnect();
      setChannel(null);
      setDmChannels(null);
      setActiveDmChannel(null);
    };
  }, [isLoggedIn, loading, data, channelId]);

  // Handle "Send a Direct Message"
  const handleInitiateDm = async (recipientUserId) => {
    let recipientDmChannel = dmChannels.find((dm) =>
      ChatUtils.channelIncludesUser(dm, recipientUserId)
    );

    if (!recipientDmChannel) {
      recipientDmChannel = StreamChatClient.channel('messaging', {
        members: [currentUserId, recipientUserId],
      });
      await recipientDmChannel.create();
    }

    setActiveDmChannel(recipientDmChannel);
  };

  if (loading || !channel || !userRole) return <Loader />;
  if (error) return <p>Something went wrong! Please reload the page and try again.</p>;

  return (
    <ChatContainer>
      <LiveStreamChat channel={channel} onInitiateDm={handleInitiateDm} />

      <DirectMessagesContainer visible={!!activeDmChannel}>
        <DirectMessagesChat channel={activeDmChannel} />
      </DirectMessagesContainer>

      {isLoggedIn && !isEmpty(dmChannels) && (
        <ChatHeader>
          {!activeDmChannel && <div />}
          {activeDmChannel && (
            <BackButton onClick={() => setActiveDmChannel(null)}>
              <BackIcon name="angle-left" />
              <BackLabel hidden={get(dmChannels, 'length', 0) !== 1}>
                {'Back to Chat'}
              </BackLabel>
            </BackButton>
          )}

          <DirectMessagesDropdown
            currentUserId={currentUserId}
            channels={dmChannels}
            selectedChannelId={activeDmChannel ? activeDmChannel.id : undefined}
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
};

EventChat.defaultProps = {};

export default EventChat;
