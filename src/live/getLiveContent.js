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
      }
    }
  }
`;
