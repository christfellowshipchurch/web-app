import gql from 'graphql-tag';

export default gql`
  query getGroup($itemId: ID!) {
    node(id: $itemId) {
      __typename
      ... on Group {
        id
        title
        summary
        coverImage {
          sources {
            uri
          }
        }
        groupResources {
          title
          action
          relatedNode {
            id
            ... on Url {
              url
            }
          }
        }
        dateTime {
          start
          end
        }
        videoCall {
          labelText
          link
          meetingId
          passcode
        }
        parentVideoCall {
          labelText
          link
          meetingId
          passcode
        }
        people(first: 1000) {
          edges {
            node {
              id
              nickName
              firstName
              photo {
                uri
              }
            }
            isGroupLeader
          }
        }
        streamChatChannel {
          id
          channelId
        }
      }
    }
    currentUser {
      id
      profile {
        id
        firstName
        nickName
      }
    }
  }
`;
