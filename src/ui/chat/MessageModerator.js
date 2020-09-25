import { withProps } from 'recompose';

import Message from './Message';

export default withProps({
  isModerator: true,
})(Message);
