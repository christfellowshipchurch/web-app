import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useApolloClient } from 'react-apollo';
import { get } from 'lodash';

// Stream Chat components
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

import { StreamChatClient, Streami18n } from 'stream-chat-client'; // read: 'src/stream-chat-client/'
import { useAuth } from 'auth';

import { GET_CURRENT_USER_FOR_CHAT_CHANNEL } from './queries';

const getStreamUser = (user) => ({
  id: user.id.split(':')[1],
  name: `${user.profile.firstName} ${user.profile.lastName}`,
  image: get(user, 'profile.photo.uri', ''),
});
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

const EventChat = ({ event }) => {
  const { logIn, isLoggedIn } = useAuth();
  const client = useApolloClient();

  const [channel, setChannel] = useState(null);
  const channelId = event.id.split(':')[1];

  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT_CHANNEL, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    const handleUserConnection = async () => {
      console.group('[rkd] handleUserConnection()');
      console.log('[rkd] ', {
        channel,
        channelId,
        client,
        data,
        error,
        event,
        isLoggedIn,
        loading,
      });

      if (loading || !isLoggedIn || error) {
        if (loading) console.log('[rkd] %c⏳ Loading...', 'color: #777');
        if (!isLoggedIn) console.log('[rkd] %c🙅‍♂️ Not logged in', 'color: #777');
        if (error) console.log('[rkd] %c❌ Error...', 'color: #777');

        if (channel) {
          console.log('[rkd] ✂️🔌 Disconnecting...');
          StreamChatClient.disconnect();
          setChannel(null);
        }

        console.groupEnd();
        return;
      }

      // Initialize user and channel
      console.log('[rkd] ⭐ Initializing Channel...');
      const { currentUser } = data;
      console.log('[rkd] currentUser:', currentUser);
      const streamUser = getStreamUser(currentUser);

      await StreamChatClient.setUser(streamUser, currentUser.streamChatToken);

      setChannel(
        StreamChatClient.channel('livestream', channelId, {
          image:
            'https://cloudfront.christfellowship.church/GetImage.ashx?guid=68c423ac-5cb9-4d0d-95ac-76b1e56d4c0f',
          name: 'Stream Chat Demo', // Derive from Event Name and Date?
          // Attach Rock data ids like schedule etc for correlation later?
          uploads: false,
        })
      );

      console.groupEnd();
    };

    handleUserConnection();
  }, [data, error, isLoggedIn, loading]);

  if (!isLoggedIn) {
    return (
      <button className={'btn btn-primary'} onClick={logIn}>
        Log In to Join Chat
      </button>
    );
  }

  if (loading) return <h1 className="text-light">Loading...</h1>;

  if (error) return <pre>{JSON.stringify({ error }, null, 2)}</pre>;

  return channel && !error ? (
    <div className="bg-white">
      <ChatInterface channel={channel} />
    </div>
  ) : null;
};

EventChat.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

EventChat.defaultProps = {};

export default EventChat;
