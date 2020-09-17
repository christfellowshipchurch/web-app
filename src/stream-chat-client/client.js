import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';
import 'styles/css/stream-chat-react.overrides.css';

const client = new StreamChat(process.env.REACT_APP_STREAM_API_KEY);

export default client;
