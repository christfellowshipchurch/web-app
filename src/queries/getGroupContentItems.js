import gql from 'graphql-tag';

export default gql`
  query getGroupBlockItems($id: ID!) {
    node(id: $id) {
      ... on WebsiteGroupItem {
        id
        title
        htmlContent

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

                coverImage {
                  name
                  sources {
                    uri
                  }
                }
                imageAlt
                imageRatio

                openLinksInNewTab
              }

              ... on WebsiteFeature {
                feature
              }

              ... on WebsitePagesContentItem {
                icon
              }
            }
          }
        }
      }
    }
  }
`;
