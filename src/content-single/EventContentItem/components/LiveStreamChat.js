import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';

import { Channel as ChannelType } from 'stream-chat';
import { Chat, Channel, Window, MessageList } from 'stream-chat-react';
import { StreamChatClient, Streami18n } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { Loader } from 'ui';
import { Message, MessageInput } from 'ui/chat';

const LiveStreamChat = ({ channel, userImage, onInitiateDm }) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="livestream">
    <Channel
      channel={channel}
      Message={withProps({
        onInitiateDm,
      })(Message)}
      LoadingIndicator={Loader}
      maxNumberOfFiles={0}
    >
      <Window>
        <MessageList noGroupByUser />
        <MessageInput userImage={userImage} />
      </Window>
    </Channel>
  </Chat>
);

LiveStreamChat.propTypes = {
  channel: PropTypes.instanceOf(ChannelType),
  userImage: PropTypes.string,
  onInitiateDm: PropTypes.func,
};

LiveStreamChat.defaultProps = {};

export default LiveStreamChat;
