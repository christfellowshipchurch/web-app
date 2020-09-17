import gql from 'graphql-tag';
import ApollosFragments from '@apollosproject/ui-fragments';
import LocalFragments from '../localFragments';

export const GET_CONTENT_ITEM = gql`
  query getContentItem($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on ContentItem {
        ...contentItemFragment
        ...eventContentItemFragment
        ...informationalContentItemFragment
        ...publishFragment
      }
    }

    metadata(relatedNode: $itemId) {
      name
      content
    }
  }
  ${ApollosFragments.CONTENT_ITEM_FRAGMENT}
  ${LocalFragments.EVENT_ITEM_FRAGMENT}
  ${LocalFragments.PUBLISH_FRAGMENT}
  ${LocalFragments.INFORMATIONAL_ITEM_FRAGMENT}
`;

export const PUBLISH_FRAGMENT = gql`
  fragment publishFragment on ContentItem {
    ... on ContentSeriesContentItem {
      author {
        firstName
        lastName

        photo {
          uri
        }
      }
      estimatedTime
      publishDate
    }
    ... on UniversalContentItem {
      author {
        firstName
        lastName

        photo {
          uri
        }
      }
      estimatedTime
      publishDate
    }
    ... on DevotionalContentItem {
      author {
        firstName
        lastName

        photo {
          uri
        }
      }
      estimatedTime
      publishDate
    }
    ... on MediaContentItem {
      author {
        firstName
        lastName

        photo {
          uri
        }
      }
      estimatedTime
      publishDate
    }
  }
`;

export const ACCESSORY_FRAGMENT = gql`
  fragment accessoryFragment on ContentItem {
    ... on ContentSeriesContentItem {
      tags
      icon
    }
    ... on UniversalContentItem {
      tags
      icon
    }
    ... on DevotionalContentItem {
      tags
      icon
    }
    ... on MediaContentItem {
      tags
      icon
    }
  }
`;

export const GET_ARTICLE_BY_TITLE = gql`
  query getContentItemByTitle($title: String!) {
    getContentItemByTitle(title: $title) {
      id
      title

      htmlContent
      summary

      images {
        sources {
          uri
        }
      }

      videos {
        sources {
          uri
        }
      }
      ...accessoryFragment
      ...publishFragment
    }
  }
  ${ACCESSORY_FRAGMENT}
  ${PUBLISH_FRAGMENT}
`;

export const GET_ARTICLE_CATEGORIES = gql`
  query getArticleCategories($id: ID!) {
    node(id: $id) {
      ... on ContentItem {
        ...accessoryFragment
      }
    }
  }
  ${ACCESSORY_FRAGMENT}
`;

export const GET_RELATED_ARTICLES = gql`
  query getRelatedArticles($id: ID!) {
    node(id: $id) {
      ... on ContentItem {
        siblingContentItemsConnection(first: 4) {
          edges {
            node {
              id
              title

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
export const GET_TOP_THREE_ARTICLES = gql`
  query getBrowseFilters {
    getBrowseFilters {
      id
      childContentItemsConnection(first: 1) {
        edges {
          node {
            id

            childContentItemsConnection(first: 1) {
              edges {
                node {
                  id

                  childContentItemsConnection(first: 4) {
                    edges {
                      node {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
