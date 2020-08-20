import gql from 'graphql-tag';
// import { GROUP_FRAGMENT } from '../../../group-single/getGroup';

export const GROUP_FRAGMENT = gql`
  fragment groupFragment on Group {
    id
    name
    title
    groupType
    summary
    members {
      id
      firstName
      photo {
        uri
      }
    }
    leaders {
      id
      firstName
      photo {
        uri
      }
    }
    schedule {
      friendlyScheduleText
    }
    coverImage {
      sources {
        uri
      }
    }
    avatars
    groupResources {
      title
      url
      contentChannelItem
    }
    dateTime {
      start
      end
    }
    videoCall {
      link
      meetingId
      passcode
    }
  }
`;

export default gql`
  query getCurrentUserGroups {
    currentUser {
      id
      profile {
        id
        groups {
          ... on Group {
            ...groupFragment
          }
        }
      }
    }
  }
  ${GROUP_FRAGMENT}
`;
