import gql from 'graphql-tag';

export const GET_LIVE_STREAM = gql`
  query getLiveStream {
    liveStream {
      isLive
      eventStartTime
    }
  }
`;
