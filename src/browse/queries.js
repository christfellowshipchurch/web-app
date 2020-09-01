import gql from 'graphql-tag';

export const GET_FILTERS = gql`
  query getBrowseFilters {
    getBrowseFilters {
      id
      childContentItemsConnection {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES_FROM_FILTER = gql`
  query getFilterCategories($id: ID!) {
    node(id: $id) {
      id
      ... on ContentItem {
        title

        childContentItemsConnection {
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
`;

export const GET_CATEGORY_PREVIEW = gql`
  query getFilterCategories($id: ID!) {
    node(id: $id) {
      id
      ... on ContentItem {
        title

        childContentItemsConnection(first: 6) {
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
`;

export const GET_SEARCH_RESULTS = gql`
  query searchResults($searchText: String!) {
    search(query: $searchText) {
      edges {
        title
        summary
        coverImage {
          name
          sources {
            uri
          }
        }
        cursor
        node {
          ... on ContentItem {
            id
            __typename
          }
        }
      }
    }
  }
`;
