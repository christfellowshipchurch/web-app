import gql from 'graphql-tag';

export default gql`
  query getWebsitePages($website: String!, $title: String!) {
    getWebsitePageContentByTitle(website: $website, title: $title) {
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
            }

            ... on WebsiteFeature {
              feature
            }
          }
        }
      }
    }
  }
`;
