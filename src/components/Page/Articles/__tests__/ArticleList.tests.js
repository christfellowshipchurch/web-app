import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'

import { GET_ALL_ARTICLES } from '../queries'
import { ArticleList } from '../'

const createArticle = (id) => ({
    "id": `ArticleContentItem:${id}`,
    "title": `Article ${id}`,
    "summary": "READ THIS GUYS!",
    "images": [
        {
            "sources": [
                {
                    "uri": "https://dev-rock.christfellowship.church/GetImage.ashx?guid=54ef1562-4e7b-4012-9630-115e056554e5"
                }
            ]
        }
    ],
})

const ARTICLE_LIST_MOCKS = [
    {
        request: {
            query: GET_ALL_ARTICLES,
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

const ARTICLE_LIST_ERROR_MOCKS = [
    {
        request: {
            query: GET_ALL_ARTICLES,
        },
        error: new Error("Error loading article lists")
    },
]

let component = null

describe("ArticleList", () => {
    it("renders without crashing", () => {
        act(() => {
            render(
                <MockedProvider mocks={ARTICLE_LIST_MOCKS} addTypename={false}>
                    <ArticleList />
                </MockedProvider>
            )
        })
    })

    it("renders a list of articles", async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={ARTICLE_LIST_MOCKS} addTypename={false}>
                    <ArticleList />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders the loading state", () => {
        act(() => {
            component = render(
                <MockedProvider mocks={[]}>
                    <ArticleList />
                </MockedProvider>
            )
        })

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders the error state", async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={ARTICLE_LIST_ERROR_MOCKS}>
                    <ArticleList />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})
