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

export const GET_WEBSITE_HEADER_LOGGED_IN = gql`
query websiteNavigation($website:String!) {
  getWebsiteNavigation(website:$website) {
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
`

export const GET_PROFILE_IMAGE = gql`
query {
  currentUser {
    id
    profile {
      firstName
      photo {
        uri
      }
    }
  }
}
`