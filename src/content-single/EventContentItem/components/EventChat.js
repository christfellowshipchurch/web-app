import React from 'react';
import PropTypes from 'prop-types';

// Stream Chat
import {
  Chat,
  Channel,
  ChannelHeader,
  Window,
  MessageList,
  MessageInput,
  MessageInputSmall,
  MessageLivestream,
} from 'stream-chat-react';

import { StreamChatClient, Streami18n } from 'stream-chat-client';

const users = {
  ryan: [
    {
      id: '3a4a20f0828c592f7f366dfce8d1f9ab',
      name: 'Ryan Davidson',
      image:
        'https://cloudfront.christfellowship.church/GetImage.ashx?guid=2cb1a60f-f346-49a5-b192-be1b84875bea',
    },
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2E0YTIwZjA4MjhjNTkyZjdmMzY2ZGZjZThkMWY5YWIifQ.FbFhBRt07KWZOp2ZqYQMveGtpvIqXjM5oCUNmHQHdas',
  ],
  yoda: [
    {
      id: '3fd1595b8f555c2e1c2f1a57d2947898',
      name: 'Yoda',
      image: 'https://avatarfiles.alphacoders.com/218/thumb-218445.jpg',
    },
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2ZkMTU5NWI4ZjU1NWMyZTFjMmYxYTU3ZDI5NDc4OTgifQ.SkFGfHGd8hg4jz0xyc7RWwi2WyJlgKjaADxft5mlh0Q',
  ],
};

StreamChatClient.setUser(...users.yoda);

// const channelId = "ryan-test-channel";
const channelId = '1e07e4f2e1b52807e43b2338c73d88ba';

const channel = StreamChatClient.channel('livestream', channelId, {
  image:
    'https://cloudfront.christfellowship.church/GetImage.ashx?guid=3588831c-d389-4b7a-98ca-9476b8be2066',
  name: "Ryan's Livestream Chat Test",
});

console.log('[rkd] channel:', channel);

const EventChat = ({}) => (
  <Chat client={StreamChatClient} i18nInstance={Streami18n} theme="livestream">
    <Channel channel={channel} Message={MessageLivestream}>
      <Window>
        <ChannelHeader live />
        <MessageList />
        <MessageInput Input={MessageInputSmall} focus />
      </Window>
    </Channel>
  </Chat>
);

EventChat.propTypes = {};

EventChat.defaultProps = {};

export default EventChat;
