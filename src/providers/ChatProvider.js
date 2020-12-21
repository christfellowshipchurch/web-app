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

  console.groupCollapsed('💬%c ChatProvider', 'background: #00aeff; color: white');
  console.log('isLoggedIn:', isLoggedIn);
  console.log('chatUser:', chatUser);
  console.log('chatToken:', chatToken);
  console.groupEnd();

  useEffect(() => {
    console.group(
      '%c[💬 ChatProvider >> useEffect] one of these changed: [isLoggedIn, chatUser]',
      'background: #00aeff; color: white'
    );
    console.log('%c isLoggedIn: %c' + isLoggedIn, 'color: #00aeff', '');
    console.log('%c connectionStatus: %c' + connectionStatus, 'color: #00aeff', '');
    console.log('%c chatUser.id: %c' + chatUser?.id, 'color: #00aeff', '');

    if (connectionStatus === ConnectionStatus.CONNECTING) {
      console.log('%c ❗ Already connecting', 'background: red');
      return;
    }

    async function connectUser() {
      console.log('%c🔌 Connecting USER...', 'color: limegreen; font-weight: bold;');
      setConnectionStatus(ConnectionStatus.CONNECTING);
      await StreamChatClient.setUser(chatUser, chatToken);
      console.log('%c  ✅ (( user connected )) ', 'color: #00aeff');
      setConnectionStatus(ConnectionStatus.CONNECTED);
    }

    async function connectAnonymously() {
      console.log('%c🔌 Connecting ANONYMOUS...', 'color: limegreen; font-weight: bold;');
      setConnectionStatus(ConnectionStatus.CONNECTING);
      await StreamChatClient.setAnonymousUser();
      console.log('%c  ✅ (( anonymous user connected )) ', 'color: #00aeff');
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
        console.error('[ChatProvider] Error setting user on StreamChatClient');
        console.error(error);
        console.groupEnd();

        // We gracefully ignore a
        // if (!error.includes('setUser was called twice')) {
        setConnectionStatus(ConnectionStatus.ERROR);
        // }
      }
    }

    connect();
    console.groupEnd();

    return async () => {
      console.log(
        '%c🛑 Disconnecting | status before disconnect: ' + connectionStatus,
        'color: tomato; font-weight: bold;'
      );
      if (connectionStatus === ConnectionStatus.CONNECTED) {
        setConnectionStatus(ConnectionStatus.DISCONNECTED);
        await StreamChatClient.disconnect();
      }
    };
  }, [chatUser]);

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
