import gql from 'graphql-tag';

export const GET_CONTENT_FEED = gql`
  query getContentFeed(
    $itemId: ID!
    $after: String
    $first: Int
    $sibling: Boolean!
    $child: Boolean!
  ) {
    node(id: $itemId) {
      ... on ContentChannel {
        childContentItemsConnection(after: $after, first: $first) {
          pageInfo {
            endCursor
          }
          edges {
            node {
              id
              title
              summary
              images {
                sources {
                  uri
                }
              }
            }
          }
        }
      }

      ... on ContentItem {
        id
        title

        childContentItemsConnection(after: $after, first: $first) @include(if: $child) {
          pageInfo {
            endCursor
          }
          edges {
            node {
              ... on EventContentItem {
                hideLabel
              }
              id
              title
              summary
              images {
                sources {
                  uri
                }
              }
            }
          }
        }

        siblingContentItemsConnection(after: $after, first: $first)
        @include(if: $sibling) {
          pageInfo {
            endCursor
          }
          edges {
            node {
              ... on EventContentItem {
                hideLabel
              }
              id
              title
              summary
              images {
                sources {
                  uri
                }
              }
            }
          }
        }
      }
    }
  }
`;
