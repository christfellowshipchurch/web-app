import gql from 'graphql-tag'


export const GET_CONTENT_BY_ID = gql`
  query getContentById($id: ID!) {

    node(id: $id) {
      ...WebsitePageParts
      ...ContentParts
      ...BlockParts
      ...FeatureParts
      ...GroupParts
    }
  }

  fragment ContentParts on ContentItem {
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
  }

  fragment BlockParts on WebsiteBlockItem {
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
    target

    coverImage {
      name
      sources {
        uri
      }
    }
    imageAlt
    imageRatio
  }

  fragment FeatureParts on WebsiteFeature {
    feature
  }

  fragment GroupParts on WebsiteGroupItem {
    id
    title
    htmlContent
    
    groupLayout
    accordionType
  }

  fragment WebsitePageParts on WebsitePagesContentItem {
    title
    icon
    
    childContentItemsConnection {
      edges {
        node {
          ...ContentParts
          ...BlockParts
          ...FeatureParts
          ...GroupParts
        }
      }
    }
  }
`
