import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'
import { Chat, Channel, Window, MessageList } from 'stream-chat-react';

import { useChat, ConnectionStatus } from 'providers/ChatProvider';

// UI
import { Loader } from 'ui';
import { Message, MessageInput, ChatError } from 'ui/chat';

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
  const [StreamChatClient, connectionStatus] = useChat();

  const loading =
    connectionStatus === ConnectionStatus.CONNECTING ||
    connectionStatus === ConnectionStatus.DISCONNECTED;
  const error = !channelId || !channelType || connectionStatus === ConnectionStatus.ERROR;

  // State Data
  const [channel, setChannel] = useState(null);

  // Stream Chat Connection management
  useEffect(() => {
    async function initGroupChannel() {
      const newChannel = StreamChatClient.channel(channelType.toLowerCase(), channelId);
      setChannel(newChannel);
      console.log('[chat] 🔴💬 Group channel (newChannel):', newChannel);
    }

    if (connectionStatus === ConnectionStatus.CONNECTED) {
      initGroupChannel();
    }

    return () => {
      setChannel(null);
    };
  }, [connectionStatus]);

  if (error) {
    return (
      <ChatContainer>
        <ChatError />
      </ChatContainer>
    );
  }

  if (loading) {
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
