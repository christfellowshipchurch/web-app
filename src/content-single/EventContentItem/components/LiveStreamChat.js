import React from 'react';
import PropTypes from 'prop-types';

import { Chat, Channel, Window, MessageList } from 'stream-chat-react';
import { StreamChatClient, Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { Loader } from 'ui';
import { Message, MessageModerator, MessageInput } from 'ui/chat';

const LiveStreamChat = ({ channel, isModerator }) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="livestream">
    <Channel
      channel={channel}
      Message={isModerator ? MessageModerator : Message}
      LoadingIndicator={Loader}
      maxNumberOfFiles={0}
    >
      <Window>
        <MessageList noGroupByUser />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>
);

LiveStreamChat.propTypes = {
  channel: Channel.type.propTypes.channel.isRequired,
  isModerator: PropTypes.bool,
};

export default LiveStreamChat;
