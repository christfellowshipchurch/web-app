import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';

import { useAuth } from 'auth';
import { useCurrentUserForChat } from 'hooks'; // local folder

import { StreamChatClient, ChatUtils } from 'stream-chat-client';

// ⚠️⚠️⚠️ Dev Only
window.StreamChatClient = StreamChatClient;

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

  console.groupCollapsed('💬%c ChatProvider', 'color: cyan');
  console.log('--> isLoggedIn:', isLoggedIn);
  console.log('--> chatUser:', chatUser);
  console.log('--> chatToken:', chatToken);
  console.groupEnd();

  useEffect(() => {
    console.group('%c[useEffect] [isLoggedIn, chatUser] ', 'color: magenta');
    console.log('isLoggedIn:', isLoggedIn);

    async function disconnect() {
      console.log('%c🛑 Disconnecting', 'color: tomato; font-weight: bold;');
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
      await StreamChatClient.disconnect();
    }

    async function connectUser() {
      console.log('%c🔌 Connecting USER...', 'color: limegreen; font-weight: bold;');
      await StreamChatClient.setUser(chatUser, chatToken);
      setConnectionStatus(ConnectionStatus.CONNECTED);
    }

    async function connectAnonymously() {
      console.log('%c🔌 Connecting ANONYMOUS...', 'color: limegreen; font-weight: bold;');
      await StreamChatClient.setAnonymousUser();
    }

    async function connect() {
      try {
        setConnectionStatus(ConnectionStatus.CONNECTING);

        if (isLoggedIn && chatUser && chatToken) {
          await connectUser();
        }

        if (!isLoggedIn) {
          await connectAnonymously();
        }
        setConnectionStatus(ConnectionStatus.CONNECTED);
      } catch (error) {
        console.error('[ChatProvider] Error setting user on StreamChatClient');
        console.error(error);
        console.groupEnd();
        setConnectionStatus(ConnectionStatus.ERROR);
      }
    }

    connect();
    console.groupEnd();
    return disconnect;
  }, [isLoggedIn, chatUser]);

  return <ChatContext.Provider value={connectionStatus}>{children}</ChatContext.Provider>;
};

function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error(`useChat must be used within a ChatProvider`);
  }

  return [StreamChatClient, context];
}

export { ChatProvider as default, useChat, ConnectionStatus };
