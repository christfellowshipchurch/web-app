import { GET_ARTICLE_CATEGORIES } from '../articles/queries'

export const ARTICLE_CATEGORIES_MOCK = {
    request: {
        query: GET_ARTICLE_CATEGORIES,
        variables: { id: "MainArticle" }
    },
    result: {
        data: {
            node: {
                categories: [
                    'Category 1',
                    'Category 2',
                    'Category 3',
                ]
            }
        },
    },
}

export const ARTICLE_CATEGORIES_ERROR = {
    request: {
        query: GET_ARTICLE_CATEGORIES,
        variables: { id: "MainArticle" }
    },
    error: new Error("Error loading article categories")
}