import React from 'react';
import PropTypes from 'prop-types';

import { Channel as ChannelType } from 'stream-chat';
import { Chat, Channel, Window, MessageList } from 'stream-chat-react';
import { StreamChatClient, Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { Loader } from 'ui';
import { Message, MessageInput } from 'ui/chat';

const DirectMessagesChat = ({ channel }) => {
  if (!channel) return null;

  return (
    <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="messaging">
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
  );
};

DirectMessagesChat.propTypes = {
  channel: PropTypes.instanceOf(ChannelType),
};

export default DirectMessagesChat;
