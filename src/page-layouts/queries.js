import gql from 'graphql-tag'

export const GET_BLOCK_ITEMS = gql`
  query getBlockItems($website:String!, $title:String!) {
    getWebsitePageContentByTitle(website:$website, title:$title) {
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

            coverImage {
              name
              sources {
                uri
              }
            }

            ... on WebsiteBlockItem {
              title
              subtitle

              contentLayout
              callToAction {
                call
                action
              }
              secondaryCallToAction {
                call
                action
              }
      
              imageAlt
              imageRatio

              openLinksInNewTab
            }
            

            ... on WebsiteGroupItem {
              groupLayout
              accordionType 
              title
            }

            ... on WebsiteFeature {
              feature
              title
              subtitle
            } 
          }
        }
      }
    }
  }
`
