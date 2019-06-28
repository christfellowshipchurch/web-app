import gql from 'graphql-tag';

export default (id) => gql`
query {
  node(id:"${id}") {
    ... on WebsiteGroupContentItem {
      id
      title
      
      childContentItemsConnection {
        edges {
          node {
            id
            title

            htmlContent

            videos {
              sources {
                uri
              }
            }

            images {
              sources {
                uri
              }
            }

            ... on WebsiteContentItem {
              subtitle

              buttonColor
              backgroundColor
              
              contentLayout
              callsToAction {
                call
                action
              }
              target
      
              coverImage {
                name
                sources {
                  uri
                }
              }
              imageAlt
              imageRatio

              gridImageLink
              openLinksInNewTab
            }
          }
        }
      }
    }
  }
}
`;
