import gql from 'graphql-tag';

export default gql`
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
    phoneNumbers
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
    parentVideoCall {
      link
      meetingId
      passcode
    }
  }
`;
