import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get } from 'lodash';

import { Chat, Channel, Window, MessageList } from 'stream-chat-react';

import { useAuth } from 'auth';
import { StreamChatClient, Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'
import { Loader } from 'ui';
import { Message, MessageInput } from 'ui/chat';

import { GET_CURRENT_USER_FOR_CHAT, GET_CURRENT_USER_ROLE_FOR_CHANNEL } from '../queries';

// ✂️ -------------------------------------------
// TODO: Find better home for these
const getStreamUser = (user) => ({
  id: user.id.split(':')[1],
  name: `${user.profile.firstName} ${user.profile.lastName}`,
  image: get(user, 'profile.photo.uri', ''),
});

const ChatRoles = Object.freeze({
  USER: 'USER',
  MODERATOR: 'MODERATOR',
});

const ChatContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* border: 1px red dashed; */
`;

const DirectMessagesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  transform: translateX(${({ visible }) => (visible ? 0 : '100%')});
  /* border: 2px cyan solid; */
  background: rgba(255, 255, 255, 0.33);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: ${({ theme }) => theme.shadow.small};
`;

const ChatHeader = styled.div`
  position: absolute;
  width: '100%';
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.card.background};
`;

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

const DirectMessagesChat = ({ channel }) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="messaging">
    <Channel channel={channel} Message={Message} LoadingIndicator={Loader}>
      <Window>
        <p style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '1rem' }}>
          Direct Messages with Yoda
        </p>
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>
);

DirectMessagesChat.propTypes = {
  channel: Channel.type.propTypes.channel.isRequired,
};

const getOtherUser = (currentUserId, channel) => {
  const otherUser = Object.values(channel.state.members).find(
    (member) => member.user.id !== currentUserId
  );

  return get(otherUser, 'user.name', 'Unknown User');
};

const DirectMessagesSelect = ({ currentUserId, channels }) => {
  return (
    <select placeholder="Direct Messages">
      <option value="" disabled selected>
        Direct Messages...
      </option>
      {channels.map((channel) => (
        <option key={channel.id}>{getOtherUser(currentUserId, channel)}</option>
      ))}
    </select>
  );
};
DirectMessagesSelect.propTypes = {
  currentUserId: PropTypes.string,
  channels: PropTypes.arrayOf(Channel.type.propTypes.channel),
};

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
  const [isViewingDms, setIsViewingDms] = useState(false);
  const [dmChannels, setDmChannels] = useState([]);
  const [dmChannel, setDmChannel] = useState(null);

  const stripPrefix = (id) => id.split(':')[1];

  useEffect(() => {
    const handleUserConnection = async () => {
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

      if (isLoggedIn) {
        const members = [
          'AuthenticatedUser:3a4a20f0828c592f7f366dfce8d1f9ab', // Ryan
          'AuthenticatedUser:3fd1595b8f555c2e1c2f1a57d2947898', // Yoda
        ].map(stripPrefix);

        const newDmChannel = StreamChatClient.channel('messaging', {
          members,
        });
        await newDmChannel.create();
        setDmChannel(newDmChannel);

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
    };

    handleUserConnection();

    return () => {
      StreamChatClient.disconnect();
      setChannel(null);
    };
  }, [isLoggedIn, loading, data, channelId]);

  if (loading || !channel) return <Loader />;
  if (error) return <pre>{JSON.stringify({ error }, null, 2)}</pre>;

  return (
    <ChatContainer>
      <LiveStreamChat channel={channel} isLoggedIn={isLoggedIn} onLogIn={logIn} />

      <DirectMessagesContainer visible={isViewingDms}>
        <DirectMessagesChat channel={dmChannel} />
      </DirectMessagesContainer>

      {isLoggedIn && (
        <ChatHeader>
          <button onClick={() => setIsViewingDms(!isViewingDms)}>
            {isViewingDms ? '< Back to Chat' : 'View Direct Messages >'}
          </button>
          <DirectMessagesSelect
            currentUserId={stripPrefix(data.currentUser.id)}
            channels={dmChannels}
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
