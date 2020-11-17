import gql from 'graphql-tag';

export default gql`
  query groupCoverImages {
    groupCoverImages {
      guid
      image {
        sources {
          uri
        }
      }
    }
  }
`;
