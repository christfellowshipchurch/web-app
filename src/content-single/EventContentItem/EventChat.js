import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

// Stream Chat
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

ChatInterface.propTypes = {
  channel: Channel.type.propTypes.channel,
};

const EventChat = ({ channelId }) => {
  // User data
  const { isLoggedIn } = useAuth();
  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT_CHANNEL, {
    skip: !isLoggedIn,
  });

  // Stream channel data
  const [channel, setChannel] = useState(null);

  console.log('[rkd] 💬%c EventChat', 'color: #777', {
    channelId,
    isLoggedIn,
    loading,
    data,
    error,
    channel,
  });

  if (error) console.log('[rkd]%c❌ Error...', 'color: #F00');

  useEffect(() => {
    const handleUserConnection = async () => {
      if (isLoggedIn && !loading && data && !StreamChatClient.userId) {
        // Init user
        const streamUser = getStreamUser(data.currentUser);
        await StreamChatClient.setUser(streamUser, data.currentUser.streamChatToken);

        // Init channel
        setChannel(
          StreamChatClient.channel('livestream', channelId, {
            name: 'Stream Chat Demo',
            uploads: false,
          })
        );
      }

      return () => {
        StreamChatClient.disconnect();
        setChannel(null);
      };
    };

    handleUserConnection();
  }, [isLoggedIn, loading, data]);

  if (!isLoggedIn) {
    return <p>Guest view (logged out)</p>;
  }

  if (loading || !channel) return <h1 className="text-light">Loading...</h1>;
  if (error) return <pre>{JSON.stringify({ error }, null, 2)}</pre>;

  return (
    <div className="bg-white">
      <ChatInterface channel={channel} />
    </div>
  );
};

EventChat.propTypes = {
  channelId: PropTypes.string.isRequired,
};

EventChat.defaultProps = {};

export default EventChat;
