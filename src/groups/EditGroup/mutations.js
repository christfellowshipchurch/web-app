import gql from 'graphql-tag';

export const UPDATE_GROUP_COVER_IMAGE = gql`
  mutation updateGroupCoverImage($imageId: String, $groupId: ID!) {
    updateGroupCoverImage(imageId: $imageId, groupId: $groupId) {
      id
    }
  }
`;

export const UPDATE_GROUP_RESOURCE_URL = gql`
  mutation updateGroupResourceUrl(
    $url: String!
    $title: String!
    $groupId: ID!
    $relatedNodeId: ID
  ) {
    updateGroupResourceUrl(
      relatedNodeId: $relatedNodeId
      url: $url
      title: $title
      groupId: $groupId
    ) {
      id
    }
  }
`;

export const UPDATE_GROUP_RESOURCE_CONTENT_ITEM = gql`
  mutation updateGroupResourceContentItem(
    $contentItemId: ID!
    $groupId: ID!
    $relatedNodeId: ID
  ) {
    updateGroupResourceContentItem(
      relatedNodeId: $relatedNodeId
      contentItemId: $contentItemId
      groupId: $groupId
    ) {
      id
    }
  }
`;

export const REMOVE_GROUP_RESOURCE = gql`
  mutation removeGroupResource($groupId: ID!, $relatedNodeId: ID!) {
    removeGroupResource(relatedNodeId: $relatedNodeId, groupId: $groupId) {
      id
    }
  }
`;
