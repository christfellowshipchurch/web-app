import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from 'auth';
import { useCurrentUserForChat } from 'hooks'; // local folder

import { StreamChatClient } from 'stream-chat-client';

// :: Enums & Actions
const ConnectionStatus = Object.freeze({
  CONNECTED: 'CONNECTED',
  CONNECTING: 'CONNECTING',
  DISCONNECTED: 'DISCONNECTED',
  ERROR: 'ERROR',
});

// :: Contexts
const ChatContext = createContext(null);

// :: Providers
const ChatProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { chatUser, chatToken } = useCurrentUserForChat();
  const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.DISCONNECTED);

  useEffect(() => {
    async function connectUser() {
      setConnectionStatus(ConnectionStatus.CONNECTING);
      await StreamChatClient.setUser(chatUser, chatToken);
      setConnectionStatus(ConnectionStatus.CONNECTED);
    }

    async function connectAnonymously() {
      setConnectionStatus(ConnectionStatus.CONNECTING);
      await StreamChatClient.setAnonymousUser();
      setConnectionStatus(ConnectionStatus.CONNECTED);
    }

    async function connect() {
      try {
        if (isLoggedIn && chatUser && chatToken) {
          await connectUser();
        }

        if (!isLoggedIn) {
          await connectAnonymously();
        }
      } catch (error) {
        console.error('ChatProvider error: ', error);
        setConnectionStatus(ConnectionStatus.ERROR);
      }
    }

    if (connectionStatus === ConnectionStatus.DISCONNECTED) {
      connect();
    }

    // Cleanup / Disconnect
    return async () => {
      if (connectionStatus === ConnectionStatus.CONNECTED) {
        setConnectionStatus(ConnectionStatus.DISCONNECTED);
        await StreamChatClient.disconnect();
      }
    };
  }, [isLoggedIn, chatUser, chatToken, connectionStatus]);

  return <ChatContext.Provider value={connectionStatus}>{children}</ChatContext.Provider>;
};

// :: Hook
function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error(`useChat must be used within a ChatProvider`);
  }

  return [StreamChatClient, context];
}

export { ChatProvider as default, useChat, ConnectionStatus };
