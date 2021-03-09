import gql from 'graphql-tag';

export default gql`
  query getLiveContent {
    liveStreams {
      ... on LiveStream {
        isLive
        eventStartTime
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
          channelType
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
          image
          title
        }
      }
    }
  }
`;
