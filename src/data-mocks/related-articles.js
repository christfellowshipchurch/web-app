import { GET_RELATED_ARTICLES } from '../article/queries'
import { ARTICLE_TEMPLATE } from './article-details'

export const RELATED_ARTICLES_MOCKS = {
    request: {
        query: GET_RELATED_ARTICLES,
        variables: { id: "MainArticle" }
    },
    result: {
        data: {
            node: {
                siblingContentItemsConnection: {
                    edges: [
                        { node: ARTICLE_TEMPLATE },
                        { node: ARTICLE_TEMPLATE },
                        { node: ARTICLE_TEMPLATE },
                    ]
                }
            }
        },
    },
}

export const RELATED_ARTICLES_ERROR = {
    request: {
        query: GET_RELATED_ARTICLES,
    },
    error: new Error("Error loading related articles")
}
