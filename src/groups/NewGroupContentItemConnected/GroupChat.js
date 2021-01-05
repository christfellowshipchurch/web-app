import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery } from 'react-apollo';
import { get, isNil } from 'lodash';

import { Streami18n, StreamChatClient, ChatUtils } from 'stream-chat-client'; // really: 'src/stream-chat-client/'
import { Chat, Channel, Window, MessageList } from 'stream-chat-react';

import { useAuth } from 'auth';

// UI
import { Loader } from 'ui';
import { Message, MessageInput, ChatError } from 'ui/chat';

import { GET_CURRENT_USER_FOR_CHAT } from 'content-single/EventContentItem/queries';

const ChatContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background: ${({ theme }) => theme.card.background};
`;

// Main Component
// ------------------------

const GroupChat = ({ channelId, channelType }) => {
  // User data
  const { isLoggedIn } = useAuth();
  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT, {
    skip: !isLoggedIn,
  });

  const currentUserId = ChatUtils.stripPrefix(get(data, 'currentUser.id'));

  // State Data
  const [channel, setChannel] = useState(null);
  const [connectionError, setConnectionError] = useState(false);

  // Effects and Event Listeners
  useEffect(() => {
    const handleUserConnection = async () => {
      console.group('[chat]%c 🟢 handleUserConnection()', 'color: limegreen;');
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
          setConnectionError(true);
        }

        // Initialize channel, if we properly connected as user or guest
        const newChannel = StreamChatClient.channel(channelType.toLowerCase(), channelId);
        setChannel(newChannel);
        console.log('[chat] 🔴💬 Group channel (newChannel):', newChannel);

        // ⚠️ Temporary/to be removed prior to end-user release
        setTimeout(() => {
          ChatUtils.logChannelMembers(newChannel);
        }, 1000);
      } catch (err) {
        console.log('❌%c Chat connection error ❌', 'color: red');
        console.error(err);
        setConnectionError(true);
      }

      console.groupEnd();
    };

    handleUserConnection();

    return async () => {
      console.log('[chat] 🟠%c Cleanup handleUserConnection 🧹', 'color: orange');
      setChannel(null);
      await StreamChatClient.disconnect();
    };
  }, [isLoggedIn, loading, data, channelId, currentUserId]);

  if (error || connectionError) {
    return (
      <ChatContainer>
        <ChatError />
      </ChatContainer>
    );
  }

  if (loading || !channel) {
    return (
      <ChatContainer>
        <Loader />
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="group">
        <Channel
          channel={channel}
          Message={Message}
          LoadingIndicator={Loader}
          maxNumberOfFiles={0}
        >
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </ChatContainer>
  );
};

GroupChat.propTypes = {
  channelId: PropTypes.string.isRequired,
  channelType: PropTypes.string.isRequired,
};

GroupChat.defaultProps = {};

export default GroupChat;
