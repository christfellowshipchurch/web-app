import React from "react";
import PropTypes from "prop-types";

// Stream Chat
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  Window,
  MessageList,
  MessageInput,
  MessageInputSmall,
  MessageLivestream,
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";
import "../../../styles/css/stream-chat-react.overrides.css";

const chatClient = new StreamChat(process.env.REACT_APP_STREAM_API_KEY);
const users = {
  ryan: [
    {
      id: "3a4a20f0828c592f7f366dfce8d1f9ab",
      name: "Ryan Davidson",
      image:
        "https://cloudfront.christfellowship.church/GetImage.ashx?guid=2cb1a60f-f346-49a5-b192-be1b84875bea",
    },
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2E0YTIwZjA4MjhjNTkyZjdmMzY2ZGZjZThkMWY5YWIifQ.FbFhBRt07KWZOp2ZqYQMveGtpvIqXjM5oCUNmHQHdas"
  ],
  yoda: [
    {
      id: "3fd1595b8f555c2e1c2f1a57d2947898",
      name: "Yoda",
      image:
        "https://avatarfiles.alphacoders.com/218/thumb-218445.jpg",
    },
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiM2ZkMTU5NWI4ZjU1NWMyZTFjMmYxYTU3ZDI5NDc4OTgifQ.SkFGfHGd8hg4jz0xyc7RWwi2WyJlgKjaADxft5mlh0Q'
  ]
}

chatClient.setUser(...users.yoda);

const channel = chatClient.channel("livestream", "ryan-test-channel", {
  image: "https://cloudfront.christfellowship.church/GetImage.ashx?guid=3588831c-d389-4b7a-98ca-9476b8be2066",
  name: "Ryan's Livestream Chat Test",
});

console.log('[rkd] channel:', channel);

const EventChat = ({ }) => (
  <Chat client={chatClient} theme={"livestream"}>
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