import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get, isEmpty, isNil } from 'lodash';

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

  const currentUserId = ChatUtils.stripPrefix(get(data, 'currentUser.id'));
  const userRole = isLoggedIn
    ? get(userRoleQueryData, 'currentUser.streamChatRole', null)
    : ChatRoles.GUEST;

  // State Data
  const [channel, setChannel] = useState(null);

  // Direct Messages
  const [dmChannels, setDmChannels] = useState([]);
  const [dmChannelsVisible, setDmChannelsVisible] = useState([]);
  const [activeDmChannel, setActiveDmChannel] = useState(null);

  const getDmChannels = async () => {
    const dmChannelsResponse = await ChatUtils.getUserDmChannels();
    setDmChannels(dmChannelsResponse);

    const recentDmChannels = ChatUtils.filterRecentDmChannels(dmChannelsResponse);
    console.log('[rkd] 🕑 recentDmChannels:', recentDmChannels);
    setDmChannelsVisible(recentDmChannels);
    console.groupEnd();
  };

  // Effects and Event Listeners
  useEffect(() => {
    const handleUserConnection = async () => {
      console.group('[chat]%c 🟢 handleUserConnection()', 'color: limegreen;');

      // Initialize user first
      const shouldConnectAsUser =
        isLoggedIn &&
        !loading &&
        data &&
        !isNil(get(data, 'currentUser.streamChatToken')) &&
        !get(StreamChatClient, 'userID');

      if (shouldConnectAsUser) {
        await StreamChatClient.setUser(
          ChatUtils.getStreamUser(data.currentUser),
          data.currentUser.streamChatToken
        );
      } else if (!isLoggedIn) {
        await StreamChatClient.setGuestUser({ id: 'guest' });
      }

      // Initialize channel, if we properly connected as user or guest
      if (get(StreamChatClient, 'userID')) {
        const newChannel = StreamChatClient.channel('livestream', channelId, {
          parentId: get(event, 'id'),
          name: get(event, 'title'),
          startsAt: get(event, 'events[0].start'),
          endsAt: get(event, 'events[0].end'),
          uploads: false,
        });
        await newChannel.create();
        setChannel(newChannel);
        console.log('[chat] 🔴💬 LiveStream channel (newChannel):', newChannel);
      }

      // Now that we're sure the channel exists, we can request the user's role for it
      if (shouldConnectAsUser) {
        await getUserRole();
        await getDmChannels();
      }
      console.groupEnd();
    };

    handleUserConnection();

    return async () => {
      console.log('[chat] 🔴%c Cleanup handleUserConnection 🧹', 'color: red');
      setChannel(null);
      setDmChannels([]);
      setDmChannelsVisible([]);
      setActiveDmChannel(null);
      await StreamChatClient.disconnect();
    };
  }, [isLoggedIn, loading, data, channelId]);

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

  if (loading || !channel || !userRole) return <Loader />;
  if (error) return <p>Something went wrong! Please reload the page and try again.</p>;

  console.log('[rkd] dmChannelsVisible:', dmChannelsVisible);
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
              <BackIcon name="angle-left" />
              <BackLabel hidden={get(dmChannelsVisible, 'length', 0) !== 1}>
                {'Back to Chat'}
              </BackLabel>
            </BackButton>
          )}

          <DirectMessagesDropdown
            currentUserId={currentUserId}
            channels={dmChannelsVisible}
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
