import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'

import { GET_RELATED_ARTICLES, GET_TOP_THREE_ARTICLES } from '../queries'
import { TopThreeArticles } from '..'

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

const TOP_THREE_ARTICLES_MOCKS = [
    {
        request: {
            query: GET_TOP_THREE_ARTICLES,
        },
        result: {
            data: {
                getArticles: [
                    createArticle(1),
                    createArticle(2),
                    createArticle(3),
                ]
            },
        },
    },
]

const EMPTY_TOP_THREE_ARTICLES_MOCKS = [
    {
        request: {
            query: GET_TOP_THREE_ARTICLES,
        },
        result: {
            data: {
                getArticles: []
            },
        },
    },
]

const TOP_THREE_ARTICLES_ERROR_MOCKS = [
    {
        request: {
            query: GET_TOP_THREE_ARTICLES,
        },
        error: new Error("Error loading related articles")
    }
]

let component = null

describe("TopThreeArticles", () => {
    it("renders without crashing", () => {
        act(() => {
            render(
                <MockedProvider mocks={TOP_THREE_ARTICLES_MOCKS} addTypename={false}>
                    <TopThreeArticles />
                </MockedProvider>
            )
        })
    })

    it("renders the loading state", () => {
        act(() => {
            component = render(
                <MockedProvider mocks={[]}>
                    <TopThreeArticles />
                </MockedProvider>
            )
        })

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders the error state", async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={TOP_THREE_ARTICLES_ERROR_MOCKS}>
                    <TopThreeArticles />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders first three related articles", async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={TOP_THREE_ARTICLES_MOCKS} addTypename={false}>
                    <TopThreeArticles />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders first three related articles", async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={EMPTY_TOP_THREE_ARTICLES_MOCKS} addTypename={false}>
                    <TopThreeArticles />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})