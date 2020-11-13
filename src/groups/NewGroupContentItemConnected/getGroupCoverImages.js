import gql from 'graphql-tag';

export default gql`
  query groupCoverImages {
    getGroupCoverImages {
      guid
      image {
        sources {
          uri
        }
      }
    }
  }
`;
