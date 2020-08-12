import gql from 'graphql-tag';

export default gql`
  query getLiveContent {
    liveStreams {
      ...on LiveStream {
        isLive
        media {
          sources {
            uri
          }
        }

        callsToAction {
          call
          action
        }

        contentItem {
          id
        }
      }
    }
  }
`;