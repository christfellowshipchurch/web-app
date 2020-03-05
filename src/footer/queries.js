import gql from 'graphql-tag';

export const GET_WEBSITE_FOOTER = gql`
  query websiteNavigation($website:String!) {
    getWebsiteNavigation(website:$website) {
      id
    
      images {
        sources {
          uri
        }
        name
      }
      
      footerLinks {
        call
        action
      }

      socialMediaLinks {
        call
        action
      }
    }
  }
`;
