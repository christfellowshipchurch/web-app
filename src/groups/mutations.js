import gql from 'graphql-tag';

export const UPDATE_GROUP_COVER_IMAGE = gql`
  mutation updateGroupCoverImage($imageId: String, $groupId: ID!) {
    updateGroupCoverImage(imageId: $imageId, groupId: $groupId) {
      id
    }
  }
`;

export const UPDATE_GROUP_RESOURCE = gql`
  mutation updateGroupResource($url: String!, $title: String!, $groupId: ID!, $id: ID) {
    updateGroupResource(id: $id, url: $url, title: $title, groupId: $groupId) {
      id
    }
  }
`;
