import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get } from 'lodash';

import {
  Chat,
  Channel,
  ChannelHeader,
  Window,
  MessageList,
  MessageInput,
  MessageInputSmall,
  MessageLivestream,
} from 'stream-chat-react';

import { StreamChatClient, Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'
import { useAuth } from 'auth';

import { GET_CURRENT_USER_FOR_CHAT, GET_CURRENT_USER_ROLE_FOR_CHANNEL } from './queries';

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
// ✂️ -------------------------------------------

const DebugInfo = ({ children }) =>
  window.location.search.indexOf('debug') >= 0 ? children : null;

const ChatInterface = ({ channel }) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="livestream">
    <Channel channel={channel} Message={MessageLivestream}>
      <Window>
        <ChannelHeader live />
        <MessageList />
        <MessageInput Input={MessageInputSmall} focus />
      </Window>
    </Channel>
  </Chat>
);

ChatInterface.propTypes = {
  channel: Channel.type.propTypes.channel,
};

const EventChat = ({ channelId }) => {
  // User data
  const { isLoggedIn } = useAuth();
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
    <div className="bg-white">
      <ChatInterface channel={channel} />
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
    </div>
  );
};

EventChat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

EventChat.defaultProps = {};

export default EventChat;
