import gql from 'graphql-tag'

export const GET_CATEGORY_BY_TITLE = gql`
    query getCategoryByTitle($title:String!) {
        getCategoryByTitle(title: $title) {
            id
            title
        }
    }
`