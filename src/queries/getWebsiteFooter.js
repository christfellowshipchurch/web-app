import gql from 'graphql-tag';

export default gql`
  query websiteNavigation($website:String!) {
    getWebsiteNavigation(website:$website) {
      id
    
      images {
        sources {
          uri
        }
        name
      }
      
      facebookUrl
      twitterUrl
      instagramUrl
      
      footerLinks {
        call
        action
      }
    }
  }
`;
