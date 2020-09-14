import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useLazyQuery } from 'react-apollo';
import styled from 'styled-components/macro';
import { get } from 'lodash';

import { baseUnit } from 'styles/config';

import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  MessageInputSmall,
} from 'stream-chat-react';

import { useAuth } from 'auth';
import { StreamChatClient, Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'
import { Message } from 'ui/chat';

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

const DebugInfo = ({ children }) =>
  window.location.search.indexOf('debug') >= 0 ? children : null;
// ✂️ -------------------------------------------

const LoginButton = styled.button`
  color: ${({ theme }) => theme.link};
  background: none;
  border: none;
  padding: 0;
`;

const LoginPrompt = styled.p`
  position: relative;
  width: 100%;
  padding: ${baseUnit(2)};
  margin-top: ${baseUnit(2)};
  margin-bottom: 0;
  text-align: center;
  background: ${({ theme }) => theme.card.background};
  box-shadow: 0 -${baseUnit(3)} ${baseUnit(4)} ${({ theme }) => theme.body.background};
`;

// ----------------

const ChatInterface = ({ channel, isLoggedIn, onLogIn }) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="livestream">
    <Channel channel={channel} Message={Message}>
      <Window>
        {/* <ChannelHeader live /> */}
        <MessageList />
        {isLoggedIn ? (
          <div className="bg-white mt-2">
            <MessageInput Input={MessageInputSmall} noFiles />
          </div>
        ) : (
          <LoginPrompt>
            <LoginButton onClick={onLogIn}>Log in</LoginButton> to chat with the community
          </LoginPrompt>
        )}
      </Window>
    </Channel>
  </Chat>
);

ChatInterface.propTypes = {
  channel: Channel.type.propTypes.channel.isRequired,
  isLoggedIn: PropTypes.bool,
  onLogIn: PropTypes.func,
};
ChatInterface.defaultProps = {
  isLoggedIn: false,
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

  if (loading || !channel) return <h1 className="text-light">Loading...</h1>;
  if (error) return <pre>{JSON.stringify({ error }, null, 2)}</pre>;

  return (
    <>
      <ChatInterface channel={channel} isLoggedIn={isLoggedIn} onLogIn={logIn} />
      <DebugInfo>
        <p className="px-2 small">
          <code className="d-block">
            <b>Channel ID:</b> {channelId}
          </code>
          <code className="d-block">
            <b>User ID: </b>{' '}
            {isLoggedIn ? get(data, 'currentUser.id').split(':')[1] : 'guest'}
          </code>
          <code className="d-block">
            <b>User role:</b> {userRole}
          </code>
        </p>
      </DebugInfo>
    </>
  );
};

EventChat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

EventChat.defaultProps = {};

export default EventChat;
