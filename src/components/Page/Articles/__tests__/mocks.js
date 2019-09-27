import { GET_ALL_ARTICLES, GET_ARTICLE_BY_TITLE } from '../queries'

const createArticle = (id) => ({
    "id": `ArticleContentItem:${id}`,
    "title": `Article ${id}`,
    "htmlContent": "<h1><b>Man</b></h1><h4><b>This is how to be one.</b></h4><p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
    "summary": "READ THIS GUYS!",
    "readTime": "10",
    "images": [
        {
            "sources": [
                {
                    "uri": "https://dev-rock.christfellowship.church/GetImage.ashx?guid=54ef1562-4e7b-4012-9630-115e056554e5"
                }
            ]
        }
    ],
    "author": {
        "firstName": "Todd",
        "lastName": "Mullins",
        "photo": {
            "uri": "https://dev-rock.christfellowship.church/GetImage.ashx?guid=36fe5474-a72a-4d0e-8cc0-f92793ea6f73"
        }
    }
})

export const articleListMocks = [
    {
        request: {
            GET_ALL_ARTICLES,
        },
        result: {
            data: {
                getArticles: [
                    createArticle(1),
                    createArticle(2),
                ]
            },
        },
    },
]

export const articleDetailMock = [
    {
        request: {
            GET_ARTICLE_BY_TITLE,
            variables: {
                title: 'Article 1'
            }
        },
        result: {
            data: {
                getArticleByTitle: createArticle(1)
            },
        },
    },
]