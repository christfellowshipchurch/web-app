import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get, isEmpty } from 'lodash';
import classnames from 'classnames';

import { baseUnit } from 'styles/theme';

import { Chat, Channel, Window, MessageList } from 'stream-chat-react';

import { useAuth } from 'auth';
import { StreamChatClient, Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

// UI
import { Loader, Icon } from 'ui';
import { Message, MessageInput } from 'ui/chat';

import { GET_CURRENT_USER_FOR_CHAT, GET_CURRENT_USER_ROLE_FOR_CHANNEL } from '../queries';

// TODO: Find better home for these
// ✂️ -----------------------------------------------------------

const getStreamUser = (user) => ({
  id: user.id.split(':')[1],
  name: `${user.profile.firstName} ${user.profile.lastName}`,
  image: get(user, 'profile.photo.uri', ''),
});

const getOtherUser = (currentUserId, channel) => {
  const otherUser = Object.values(channel.state.members).find(
    (member) => member.user.id !== currentUserId
  );

  return get(otherUser, 'user.name', 'Unknown User');
};

const ChatRoles = Object.freeze({
  USER: 'USER',
  MODERATOR: 'MODERATOR',
});

// ✂️ -----------------------------------------------------------

// :: Styled Components
// ------------------------

const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// ::

const LiveStreamChat = ({ channel }) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="livestream">
    <Channel channel={channel} Message={Message} LoadingIndicator={Loader}>
      <Window>
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>
);

LiveStreamChat.propTypes = {
  channel: Channel.type.propTypes.channel.isRequired,
  isLoggedIn: PropTypes.bool,
  onLogIn: PropTypes.func,
};

LiveStreamChat.defaultProps = {
  isLoggedIn: false,
};

// ✂️ -----------------------------------------------------------

// :: Styled Components
// ------------------------

const DirectMessagesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  transform: translateX(${({ visible }) => (visible ? 0 : '100%')});
  background: rgba(255, 255, 255, 0.8);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.15s;
  box-shadow: ${({ theme }) => theme.shadow.medium};
`;

const ChatHeader = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.card.background};
  padding: ${baseUnit(1)} ${baseUnit(2)};
  border-bottom: 1px ${({ theme }) => theme.card.color} solid;
`;

const HeaderButton = styled.button`
  padding: ${baseUnit(1)};
  border: none;
  background: none;
  color: ${({ theme }) => theme.link};
`;

const HeaderIcon = styled(Icon).attrs(({ theme, name }) => ({
  name,
  fill: theme.brand,
  size: 22,
}))``;

const DirectMessagesSelect = styled.select`
  padding: ${baseUnit(1)};
`;

const DirectMessagesChat = ({ channel }) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="messaging">
    <Channel channel={channel} Message={Message} LoadingIndicator={Loader}>
      <Window>
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>
);

DirectMessagesChat.propTypes = {
  channel: Channel.type.propTypes.channel.isRequired,
};

// :: Main Component
// ------------------------

const DirectMessagesList = ({ currentUserId, channels, selectedChannelId, onSelect }) => {
  if (isEmpty(channels) || (channels.length === 1 && selectedChannelId)) {
    return null;
  }

  if (channels.length === 1) {
    return (
      <HeaderButton onClick={() => onSelect(channels[0])}>
        <span>DM with {getOtherUser(currentUserId, channels[0])}</span>
        <HeaderIcon name="angle-right" />
      </HeaderButton>
    );
  }

  const handleValueChange = (event) => {
    const value = event.target.value;
    const selectedChannel = channels.find((channel) => channel.id === value);
    onSelect(selectedChannel);
  };

  return (
    <DirectMessagesSelect value={selectedChannelId} onChange={handleValueChange}>
      <option value="" disabled selected>
        Direct Messages...
      </option>
      {channels.map((channel) => (
        <option key={channel.id} value={channel.id}>
          {getOtherUser(currentUserId, channel)}
        </option>
      ))}
    </DirectMessagesSelect>
  );
};

DirectMessagesList.propTypes = {
  currentUserId: PropTypes.string,
  channels: PropTypes.arrayOf(Channel.type.propTypes.channel),
  selectedChannelId: PropTypes.string,
  onSelect: PropTypes.func,
};

DirectMessagesList.defaultProps = {
  selectedChannelId: '',
};

// Main Component
// ------------------------

const EventChat = ({ channelId }) => {
  // User data
  const { isLoggedIn, logIn } = useAuth();
  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT, {
    skip: !isLoggedIn,
  });

  // The user role query is separate and invoked manually at the right time, since
  // the channel must exist first before we can request our role in it.
  // That problem only affects the first user for the Event's chat.
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
    ? get(userRoleQueryData, 'currentUser.streamChatRole', ChatRoles.USER)
    : ChatRoles.USER;

  const [channel, setChannel] = useState(null);
  const [dmChannels, setDmChannels] = useState([]);
  const [activeDmChannel, setActiveDmChannel] = useState(null);
  const stripPrefix = (id) => id.split(':')[1];

  useEffect(() => {
    const handleUserConnection = async () => {
      console.group('[rkd] handleUserConnection()');

      // Initialize user first
      const canConnectAsUser = isLoggedIn && !loading && data;
      const streamUserMismatch =
        get(StreamChatClient, 'user.id') !== get(data, 'currentUser.id');

      if (canConnectAsUser && streamUserMismatch) {
        await StreamChatClient.setUser(
          getStreamUser(data.currentUser),
          data.currentUser.streamChatToken
        );
      } else if (!isLoggedIn) {
        await StreamChatClient.setGuestUser({ id: 'guest' });
      }

      // Initialize channel
      const newChannel = StreamChatClient.channel('livestream', channelId, {
        name: 'Stream Chat Demo',
        uploads: false,
      });
      await newChannel.create();
      setChannel(newChannel);
      console.log('[rkd] newChannel:', newChannel);

      if (isLoggedIn) {
        // const members = [
        //   'AuthenticatedUser:3a4a20f0828c592f7f366dfce8d1f9ab', // Ryan
        //   'AuthenticatedUser:3fd1595b8f555c2e1c2f1a57d2947898', // Yoda
        //   // 'AuthenticatedUser:095eeb4c77024b09efce0a59d38caeef', // Gerard Hey
        // ].map(stripPrefix);

        // const newDmChannel = StreamChatClient.channel('messaging', {
        //   members,
        // });
        // await newDmChannel.create();

        console.group('[rkd] Getting list of DMs a user is participating in');
        const filter = {
          type: 'messaging',
          members: { $in: [stripPrefix(data.currentUser.id)] },
        };
        const sort = { last_message_at: -1 };
        const options = { limit: 30 };

        const dmChannelsResponse = await StreamChatClient.queryChannels(
          filter,
          sort,
          options
        );
        setDmChannels(dmChannelsResponse);
        console.log('[rkd] dmChannelsResponse:', dmChannelsResponse);
        console.groupEnd();
      }

      // Now that we're sure the channel exists, we can request the user's role for it
      if (canConnectAsUser) {
        getUserRole();
      }

      console.groupEnd();
    };

    handleUserConnection();

    return () => {
      console.log('[rkd] Cleanup handleUserConnection 🧹');
      StreamChatClient.disconnect();
      setChannel(null);
      setDmChannels(null);
      setActiveDmChannel(null);
    };
  }, [isLoggedIn, loading, data, channelId]);

  if (loading || !channel) return <Loader />;
  if (error) return <pre>{JSON.stringify({ error }, null, 2)}</pre>;

  return (
    <ChatContainer>
      <LiveStreamChat channel={channel} isLoggedIn={isLoggedIn} onLogIn={logIn} />

      <DirectMessagesContainer visible={!!activeDmChannel}>
        <DirectMessagesChat channel={activeDmChannel} />
      </DirectMessagesContainer>

      {isLoggedIn && !isEmpty(dmChannels) && (
        <ChatHeader>
          {!activeDmChannel && <div />}
          {activeDmChannel && (
            <HeaderButton onClick={() => setActiveDmChannel(null)}>
              <HeaderIcon name="angle-left" />
              <span
                className={classnames({ 'd-none': get(dmChannels, 'length', 0) !== 1 })}
              >
                {'Back to Chat'}
              </span>
            </HeaderButton>
          )}

          <DirectMessagesList
            currentUserId={stripPrefix(data.currentUser.id)}
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
  channelId: PropTypes.string.isRequired,
};

EventChat.defaultProps = {};

export default EventChat;
