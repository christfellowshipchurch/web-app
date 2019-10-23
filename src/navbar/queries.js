import gql from 'graphql-tag'

export const GET_WEBSITE_HEADER = gql`
  query websiteNavigation($website:String!) {
    getWebsiteNavigation(website:$website) {
      id
      
      images {
        sources {
          uri
        }
        name
      }
      
      navigationLinks {
        call
        action
      }
      quickAction {
        call
        action
      }
    }
  }
`;
