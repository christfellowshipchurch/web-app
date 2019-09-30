import { GET_ALL_ARTICLES } from '../components/Page/Articles/queries'
import { ARTICLE_TEMPLATE } from './article-details'

export const ARTICLE_LIST_MOCKS = {
    request: {
        query: GET_ALL_ARTICLES,
    },
    result: {
        data: {
            getArticles: [
                ARTICLE_TEMPLATE,
                ARTICLE_TEMPLATE,
                ARTICLE_TEMPLATE
            ]
        },
    },
}

export const ARTICLE_LIST_ERROR = {
    request: {
        query: GET_ALL_ARTICLES,
    },
    error: new Error("Error loading article lists")
}