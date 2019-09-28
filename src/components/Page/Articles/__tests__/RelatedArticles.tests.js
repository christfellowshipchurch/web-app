import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'

import { GET_RELATED_ARTICLES, GET_TOP_THREE_ARTICLES } from '../queries'
import { RelatedArticles } from '..'

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

const RELATED_ARTICLES_MOCKS = [
    {
        request: {
            query: GET_RELATED_ARTICLES,
            variables: { id: "MainArticle" }
        },
        result: {
            data: {
                node: {
                    siblingContentItemsConnection: {
                        edges: [
                            { node: createArticle(1) },
                            { node: createArticle(2) },
                            { node: createArticle(3) },
                        ]
                    }
                }
            },
        },
    },
]

const TOP_THREE_ARTICLES_MOCKS = [
    {
        request: {
            query: GET_RELATED_ARTICLES,
            variables: { id: "MainArticle" }
        },
        result: {
            data: {
                node: {
                    siblingContentItemsConnection: {
                        edges: []
                    }
                }
            },
        },
    },
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

const RELATED_ARTICLES_ERROR_MOCKS = [
    {
        request: {
            query: GET_RELATED_ARTICLES,
        },
        error: new Error("Error loading related articles")
    }
]

const RELATED_ARTICLES_ERROR_MOCKS = [
    {
        request: {
            query: GET_RELATED_ARTICLES,
        },
        error: new Error("Error loading related articles")
    },
    {
        request: {
            query: GET_TOP_THREE_ARTICLES,
        },
        error: new Error("Error loading top articles")
    },
]

let component = null

describe("ArticleList", () => {
    it("renders without crashing", () => {
        act(() => {
            render(
                <MockedProvider mocks={RELATED_ARTICLES_MOCKS} addTypename={false}>
                    <RelatedArticles id="MainArticle" />
                </MockedProvider>
            )
        })
    })

    it("renders the loading state", () => {
        act(() => {
            component = render(
                <MockedProvider mocks={[]}>
                    <RelatedArticles id="MainArticle" />
                </MockedProvider>
            )
        })

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders the error state", async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={RELATED_ARTICLES_ERROR_MOCKS}>
                    <RelatedArticles id="MainArticle" />
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
                <MockedProvider mocks={RELATED_ARTICLES_MOCKS} addTypename={false}>
                    <RelatedArticles id="MainArticle" />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    // Top Three Articles
    it("renders the first three articles when no related articles are found", () => {
        act(() => {
            component = render(
                <MockedProvider mocks={TOP_THREE_ARTICLES_MOCKS}>
                    <RelatedArticles id="MainArticle" />
                </MockedProvider>
            )
        })

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})