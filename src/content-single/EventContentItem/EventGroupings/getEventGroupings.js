import gql from 'graphql-tag';

export default gql`
  query getEventGroupings($id: ID!) {
    node(id: $id) {
      id
      ... on EventContentItem {
        title

        callsToAction {
          call
          action
        }

        eventGroupings {
          name
          instances {
            id
            start
            end
          }
        }
      }
    }

    currentUser {
      id
      profile {
        id
        campus {
          id
          name
        }
      }
    }
  }
`;
