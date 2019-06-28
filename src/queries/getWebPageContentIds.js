import gql from 'graphql-tag';

export default gql`
  query getWebsitePages($website:String!, $title:String!) {
    getWebsitePageContentByTitle(website:$website, title:$title) {
      id
      title
      
      metaDescription
      metaKeywords
      openGraphProtocols {
        name
        content
      }
      twitterProtocols {
        name
        content
      }

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
