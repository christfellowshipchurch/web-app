import gql from 'graphql-tag';

export const GROUP_COVER_IMAGES = gql`
  query groupCoverImages {
    groupCoverImages {
      guid
      name
      image {
        sources {
          uri
        }
      }
    }
  }
`;

export const GROUP_RESOURCE_OPTIONS = gql`
  query groupResourceOptions($groupId: ID!) {
    groupResourceOptions(groupId: $groupId) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
