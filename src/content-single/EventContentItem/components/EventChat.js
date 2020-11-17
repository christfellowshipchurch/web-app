import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get, isEmpty, isNil } from 'lodash';

import { baseUnit } from 'styles/theme';

import { StreamChatClient, ChatUtils } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { useAuth } from 'auth';

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
  // User data
  const { isLoggedIn } = useAuth();
  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT, {
    skip: !isLoggedIn,
  });

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

  // Fetches DMs and filters by most recent
  const getDmChannels = async () => {
    // All DM channels, whether recent or not
    const dmChannelsResponse = await ChatUtils.getUserDmChannels();
    setDmChannels(dmChannelsResponse);

    // Only recently active DM channels
    const recentDmChannels = ChatUtils.filterRecentDmChannels(dmChannelsResponse);
    setDmChannelsVisible(recentDmChannels);
    console.groupEnd();
  };

  // Stream Chat Connection management
  useEffect(() => {
    // Listener for events on the Stream Chat client
    const handleClientEvent = (clientEvent) => {
      const { type: eventType, channel_type: channelType, user } = clientEvent;

      // :: New DM messages
      if (eventType === 'message.new' && channelType === 'messaging') {
        setActiveDmChannel((currentActiveDmChannel) => {
          // Heavy handed, but just re-fetch a users' DM channels altogether when
          // we receive a message and are *not currently viewing a conversation*.
          if (!currentActiveDmChannel) {
            getDmChannels();
          }

          // To prevent stale state data, and avoid having to useRef() etc, we'll start
          // doing a state update on activeDmChannel but return the current value.
          return currentActiveDmChannel;
        });
      }

      // :: User watching count
      if (
        (eventType === 'user.watching.start' || eventType === 'user.watching.stop') &&
        (user.role === 'guest' || user.id !== currentUserId)
      ) {
        const watcherCount = get(clientEvent, 'watcher_count', 1);
        onWatcherCountChange(watcherCount);
      }
    };

    const handleUserConnection = async () => {
      try {
        // Initialize user first
        const shouldConnectAsUser =
          isLoggedIn &&
          !loading &&
          data &&
          !isNil(get(data, 'currentUser.streamChatToken')) &&
          get(StreamChatClient, 'userID') !== currentUserId;

        if (shouldConnectAsUser) {
          await StreamChatClient.setUser(
            ChatUtils.getStreamUser(data.currentUser),
            data.currentUser.streamChatToken
          );
        } else if (!isLoggedIn) {
          await StreamChatClient.setGuestUser({ id: 'guest' });
        }

        // Initialize channel, if we properly connected as user or guest
        const newChannel = StreamChatClient.channel('livestream', channelId, {
          parentId: get(event, 'id'),
          name: get(event, 'title'),
          startsAt: get(event, 'events[0].start'),
          endsAt: get(event, 'events[0].end'),
          uploads: false,
        });
        await newChannel.create();
        await newChannel.watch();
        setChannel(newChannel);

        // Initialize value for number of people watching
        onWatcherCountChange(get(newChannel, 'state.watcher_count', 1));

        // Now that we're sure the channel exists, we can request the user's role for it
        if (shouldConnectAsUser) {
          await getUserRole();
          await getDmChannels();

          // subscribe to all client events and log the unread_count field
          StreamChatClient.on(handleClientEvent);
        }
      } catch (err) {
        console.error(err);
        setConnectionError(true);
      }
    };

    handleUserConnection();

    return async () => {
      setChannel(null);
      setDmChannels([]);
      setDmChannelsVisible([]);
      setActiveDmChannel(null);
      StreamChatClient.off(handleClientEvent);
      await StreamChatClient.disconnect();
    };
  }, [
    isLoggedIn,
    loading,
    data,
    channelId,
    currentUserId,
    event,
    getUserRole,
    onWatcherCountChange,
  ]);

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
