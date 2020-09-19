import React from 'react';

import { Chat, Channel, Window, MessageList } from 'stream-chat-react';
import { StreamChatClient, Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { Loader } from 'ui';
import { Message, MessageInput } from 'ui/chat';

const DirectMessagesChat = ({ channel }) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="messaging">
    <Channel channel={channel} Message={Message} LoadingIndicator={Loader}>
      <Window>
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>
);

DirectMessagesChat.propTypes = {
  channel: Channel.type.propTypes.channel.isRequired,
};

export default DirectMessagesChat;
