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
  border: 1px red dashed;
`;

const DirectMessages = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  border: 2px cyan solid;
  background: rgba(255, 255, 255, 0.33);
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
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>
);

DirectMessagesChat.propTypes = {
  channel: Channel.type.propTypes.channel.isRequired,
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
  const [dmChannel, setDmChannel] = useState(null);
  console.log('[rkd] data:', data);

  useEffect(() => {
    const handleUserConnection = async () => {
      // Initialize user first
      let canConnectAsUser = isLoggedIn && !loading && data;

      if (canConnectAsUser) {
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
        const stripPrefix = (id) => id.split(':')[1];
        const members = [
          'AuthenticatedUser:3a4a20f0828c592f7f366dfce8d1f9ab', // Ryan
          'AuthenticatedUser:3fd1595b8f555c2e1c2f1a57d2947898', // Yoda
        ].map(stripPrefix);
        console.log('[rkd] members:', members);

        const newDmChannel = StreamChatClient.channel('messaging', {
          members,
        });
        await newDmChannel.create();
        setDmChannel(newDmChannel);
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
      <DirectMessages>
        <DirectMessagesChat channel={dmChannel} />
      </DirectMessages>
    </ChatContainer>
  );
};

EventChat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

EventChat.defaultProps = {};

export default EventChat;
