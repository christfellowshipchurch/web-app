import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import { useAuth } from 'auth';

import { StreamChatClient, ChatUtils } from 'stream-chat-client'; // local folder
window.StreamChatClient = StreamChatClient;
// StreamChatClient.setUser(
//   {
//     id: '3a4a20f0828c592f7f366dfce8d1f9ab',
//     name: 'Ryan Davidson',
//     image:
//       'https://cloudfront.christfellowship.church/GetImage.ashx?guid=2cb1a60f-f346-49a5-b192-be1b84875bea',
//   },
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2E0YTIwZjA4MjhjNTkyZjdmMzY2ZGZjZThkMWY5YWIifQ.ccYvnloVilQ5aFkjRa5_MoJeMvYpO9d6HwahZm13tN4'
//   // ChatUtils.getStreamUser(data.currentUser),
//   // data.currentUser.streamChatToken
// );

// :: Queries
const GET_CURRENT_USER_FOR_CHAT = gql`
  query getCurrentUserForChat {
    currentUser {
      id
      streamChatToken
      profile {
        id
        firstName
        lastName
        photo {
          uri
        }
      }
    }
  }
`;

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
  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT, {
    skip: !isLoggedIn,
    fetchPolicy: 'network-only',
  });

  const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.DISCONNECTED);

  console.group('💬%c ChatProvider', 'color: cyan');
  console.log('--> isLoggedIn:', isLoggedIn);
  console.log('--> loading:', loading);
  console.log('--> data:', data);
  console.log('--> error:', error);
  console.groupEnd();

  useEffect(() => {
    console.group('%c[useEffect] Auth state change', 'color: magenta');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('data:', data);

    if (isLoggedIn && data?.currentUser) {
      async function connect() {
        console.log('%c🔌 Connecting...', 'color: limegreen; font-weight: bold;');
        const chatUser = ChatUtils.getStreamUser(data.currentUser);
        const token = data.currentUser.streamChatToken;

        console.log('chatUser:', chatUser);
        console.log('token:', token);

        try {
          await StreamChatClient.setUser(chatUser, token);
        } catch (err) {
          console.error('[ChatProvider] Error setting user on StreamChatClient');
          console.error(err);
        }
        setConnectionStatus(ConnectionStatus.CONNECTED);
      }

      connect();
      console.groupEnd();

      return async () => {
        console.log('%c🛑 Disconnecting', 'color: tomato; font-weight: bold;');
        await StreamChatClient.disconnect();
      };
    }
    console.groupEnd();
  }, [isLoggedIn, data]);

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
