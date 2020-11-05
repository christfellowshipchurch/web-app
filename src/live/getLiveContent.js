import gql from 'graphql-tag';

export default gql`
  query getLiveContent {
    liveStreams {
      ... on LiveStream {
        isLive
        media {
          sources {
            uri
          }
        }

        contentItem {
          id
        }
        streamChatChannel {
          id
          channelId
        }
        actions {
          action
          duration
          relatedNode {
            ... on Url {
              url
            }
          }
          start
          title
        }
      }
    }
  }
`;
