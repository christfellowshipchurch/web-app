import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import { useAuth } from 'auth';

import { ChatUtils } from 'stream-chat-client';

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

export default function useCurrentUserForChat() {
  const { isLoggedIn } = useAuth();

  const query = useQuery(GET_CURRENT_USER_FOR_CHAT, {
    skip: !isLoggedIn,
    fetchPolicy: 'network-only',
  });

  return {
    // getStreamUser is memoized, so consumers of this hook won't needlessly re-render
    chatUser: ChatUtils.getStreamUser(query?.data?.currentUser),
    chatToken: query?.data?.currentUser?.streamChatToken,
    ...query,
  };
}
