import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from 'react-apollo';
import { get, isNil } from 'lodash';

import { Streami18n, StreamChatClient, ChatUtils } from 'stream-chat-client'; // really: 'src/stream-chat-client/'
import { Chat, Channel, Window, MessageList } from 'stream-chat-react';

import { useAuth } from 'auth';

// UI
import { Loader } from 'ui';
import { Message, MessageInput, ChatError } from 'ui/chat';

import {
  GET_CURRENT_USER_FOR_CHAT,
  GET_CURRENT_USER_ROLE_FOR_CHANNEL,
} from 'content-single/EventContentItem/queries';

const ChatContainer = styled.div`
  position: relative;
  height: 50vh;
  width: 100%;
  overflow-x: hidden;
  background: ${({ theme }) => theme.card.background};
`;

// Main Component
// ------------------------

const GroupChat = ({ channelId }) => {
  // User data
  const { isLoggedIn } = useAuth();
  const { loading, data, error } = useQuery(GET_CURRENT_USER_FOR_CHAT, {
    skip: !isLoggedIn,
  });

  // The user role query is separate and invoked manually at the right time, since
  // the channel must exist first before we can request our role in it.
  // That problem only affects the *first* user for the Event's chat.
  const [getUserRole, { loadingRole }] = useLazyQuery(GET_CURRENT_USER_ROLE_FOR_CHANNEL, {
    fetchPolicy: 'network-only',
    variables: {
      channelId,
    },
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
          await StreamChatClient.setGuestUser({ id: 'guest' });
        }

        // Initialize channel, if we properly connected as user or guest
        const newChannel = StreamChatClient.channel('group', channelId);
        setChannel(newChannel);
        console.log('[chat] 🔴💬 Group channel (newChannel):', newChannel);

        // Now that we're sure the channel exists, we can request the user's role for it
        if (shouldConnectAsUser) {
          await getUserRole();
        }
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
  }, [isLoggedIn, loading, data, channelId]);

  if (loading || loadingRole || !channel) {
    return (
      <ChatContainer>
        <Loader />
      </ChatContainer>
    );
  }

  if (error || connectionError) {
    return (
      <ChatContainer>
        <ChatError />
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
};

GroupChat.defaultProps = {};

export default GroupChat;
