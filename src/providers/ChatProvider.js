import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';

import { useAuth } from 'auth';
import { useCurrentUserForChat } from 'hooks'; // local folder

import { StreamChatClient, ChatUtils } from 'stream-chat-client';

// ⚠️⚠️⚠️ Dev Only
window.StreamChatClient = StreamChatClient;

// :: Enums & Actions
const ConnectionStatus = Object.freeze({
  CONNECTED: 'CONNECTED',
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

    if (isLoggedIn && chatUser && chatToken) {
      async function connect() {
        console.log('%c🔌 Connecting...', 'color: limegreen; font-weight: bold;');

        try {
          await StreamChatClient.setUser(chatUser, chatToken);
          setConnectionStatus(ConnectionStatus.CONNECTED);

          console.groupEnd();
          return async () => {
            console.log('%c🛑 Disconnecting', 'color: tomato; font-weight: bold;');
            await StreamChatClient.disconnect();
          };
        } catch (err) {
          console.error('[ChatProvider] Error setting user on StreamChatClient');
          console.error(err);
          console.groupEnd();
          setConnectionStatus(ConnectionStatus.ERROR);
        }
      }

      connect();
    }
    console.groupEnd();
  }, [isLoggedIn, chatUser]);

  return <ChatContext.Provider value={connectionStatus}>{children}</ChatContext.Provider>;
};

function useChatContext() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error(`useChatContext must be used within a ChatProvider`);
  }

  return [StreamChatClient, context];
}

export { ChatProvider as default, useChatContext, ConnectionStatus };
