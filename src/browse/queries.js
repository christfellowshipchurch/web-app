import gql from 'gql-tag'

export const GET_BROWSE_FILTERS = gql`
    query getBrowseFilters {
        contentChannels {
            childContentItemsConnection {
                edges {
                    node {
                        id
                        title
                    }
                }
            }
        }
    }
`

export const GET_CATEGORIES_FROM_FILTER = gql`
    query getCategoriesFromFilter($filterId: ID!) {
        node(id: $filterId) {
        ...on ContentItem {
                title

                childContentItemsConnection {
                    edges {
                        node {
                            id
                            title

                            childContentItemsConnection(first: 3) {
                                edges {
                                    node {
                                        title
                                    }
                                }
                            }

                        }
                    }
                }

            }
        }
    }
`

export const GET_ALL_CONTENT_FROM_CATEGORY = gql`
    query getAllContentFromCategoryId($categoryId: ID!) {
        node(id: $categoryId) {
        ...on ContentItem {
                title
                childContentItemsConnection {
                    edges {
                        node {
                            title
                        }
                    }
                }
            }
        }
    }
`