import gql from 'graphql-tag'

export const GET_ALL_ARTICLES = gql`
    query {
        getArticles {
            id
            title

            summary
        
            images {
                sources {
                    uri
                }
            }
        }
    }
`

export const GET_ARTICLE_BY_TITLE = gql`
    query getArticleByTitle($title:String!) {
        getArticleByTitle(title:$title) {
            id
            title
            
            htmlContent
            summary
            readTime
            
            images {
                sources {
                    uri
                }
            }

            author {
                firstName
                lastName
                
                photo {
                    uri
                }
            }

            publishDate
        }
    }
`

export const GET_ARTICLE_CATEGORIES = gql`
    query getArticleCategories($id:ID!) {
        node(id:$id) {
            ... on ArticleContentItem {
                categories
            }
        }
    }
`

export const GET_RELATED_ARTICLES = gql`
    query getRelatedArticles($id:ID!) {
        node(id:$id) {
            ... on ArticleContentItem {
                siblingContentItemsConnection(first:3) {
                    edges {
                      node {
                        title
    
                        images {
                            sources {
                                uri
                            }
                        }
                      }
                    }
                }
            }
        }
    }
`
export const GET_TOP_THREE_ARTICLES = gql`
    query {
        getArticles(first:3) {
            title
        
            images {
                sources {
                    uri
                }
            }
        }
    }
`