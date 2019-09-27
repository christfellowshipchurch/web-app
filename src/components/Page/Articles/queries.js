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

    }
}
`

