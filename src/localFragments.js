import gql from 'graphql-tag';

export default {
  ACCESSORY_FRAGMENT: gql`
    fragment accessoryFragment on ContentItem {
      ... on ContentSeriesContentItem {
        tags
      }
      ... on UniversalContentItem {
        tags
      }
      ... on DevotionalContentItem {
        tags
      }
      ... on MediaContentItem {
        tags
      }
      ... on EventContentItem {
        label
        eventGroupings {
          name
          instances {
            id
            start
            end
          }
        }
      }
      ... on InformationalContentItem {
        redirectUrl
      }
    }
  `,
  CAMPUS_PARTS_FRAGMENT: gql`
    fragment CampusParts on Campus {
      id
      name
      latitude
      longitude
      distanceFromLocation
      street1
      street2
      city
      state
      postalCode
      image {
        uri
      }
      featuredImage {
        uri
      }
    }
  `,
  EVENT_ITEM_FRAGMENT: gql`
    fragment eventContentItemFragment on EventContentItem {
      events {
        start
        end
        campuses {
          name
        }
        location
      }
      label
      callsToAction {
        call
        action
      }
      hideLabel
    }
  `,
  INFORMATIONAL_ITEM_FRAGMENT: gql`
    fragment informationalContentItemFragment on InformationalContentItem {
      callsToAction {
        call
        action
      }
    }
  `,
  PUBLISH_FRAGMENT: gql`
    fragment publishFragment on ContentItem {
      ... on ContentSeriesContentItem {
        author {
          firstName
          lastName

          photo {
            uri
          }
        }
        estimatedTime
        publishDate
      }
      ... on UniversalContentItem {
        author {
          firstName
          lastName

          photo {
            uri
          }
        }
        estimatedTime
        publishDate
      }
      ... on DevotionalContentItem {
        author {
          firstName
          lastName

          photo {
            uri
          }
        }
        estimatedTime
        publishDate
      }
      ... on MediaContentItem {
        author {
          firstName
          lastName

          photo {
            uri
          }
        }
        estimatedTime
        publishDate
      }
    }
  `,
};
