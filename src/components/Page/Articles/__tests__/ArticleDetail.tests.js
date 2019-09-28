import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'

import { GET_ARTICLE_BY_TITLE } from '../queries'
import { ArticleDetail } from '..'

const generateMocks = (article) => [
    {
        request: {
            query: GET_ARTICLE_BY_TITLE,
            variables: {
                title: 'article-1'
            }
        },
        result: {
            data: {
                getArticleByTitle: article
            },
        },
    },
]

const ARTICLE_DETAIL_ERROR_MOCKS = [
    {
        request: {
            query: GET_ARTICLE_BY_TITLE,
        },
        error: new Error("Error loading article lists")
    },
]

let component = null

describe("ArticleDetail", () => {
    it("renders without crashing", () => {
        act(() => {
            const mocks = generateMocks({
                "id": `ArticleContentItem:1`,
                "title": `Article 1`,
                "htmlContent": "<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
                "summary": "READ THIS GUYS!",
                "readTime": "10",
                "publishDate": "2019-09-27T04:00:00.000Z",
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

            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })
    })

    // Loading States
    it("renders an article", async () => {
        act(() => {
            const mocks = generateMocks({
                "id": `ArticleContentItem:1`,
                "title": `Article 1`,
                "htmlContent": "<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
                "summary": "READ THIS GUYS!",
                "readTime": "10",
                "publishDate": "2019-09-27T04:00:00.000Z",
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

            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
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
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders the error state", async () => {
        act(() => {
            component = render(
                <MockedProvider mocks={ARTICLE_DETAIL_ERROR_MOCKS}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    // Conditional Renders
    it("passes back a null article", async () => {
        act(() => {
            const mocks = generateMocks(null)

            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders an article without a title", async () => {
        act(() => {
            const mocks = generateMocks({
                "id": `ArticleContentItem:1`,
                "title": ``,
                "htmlContent": "<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
                "summary": "READ THIS GUYS!",
                "readTime": "10",
                "publishDate": "2019-09-27T04:00:00.000Z",
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

            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders an article without a summary", async () => {
        act(() => {
            const mocks = generateMocks({
                "id": `ArticleContentItem:1`,
                "title": `Article 1`,
                "htmlContent": "<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
                "summary": "",
                "readTime": "10",
                "publishDate": "2019-09-27T04:00:00.000Z",
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

            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders an article without an image", async () => {
        act(() => {
            const mocks = generateMocks({
                "id": `ArticleContentItem:1`,
                "title": `Article 1`,
                "htmlContent": "<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
                "summary": "READ THIS GUYS!",
                "readTime": "10",
                "publishDate": "2019-09-27T04:00:00.000Z",
                "images": [
                    {
                        "sources": [
                            {
                                "uri": ""
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

            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders an article without author information", async () => {
        act(() => {
            const mocks = generateMocks({
                "id": `ArticleContentItem:1`,
                "title": `Article 1`,
                "htmlContent": "<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
                "summary": "READ THIS GUYS!",
                "readTime": "10",
                "publishDate": "2019-09-27T04:00:00.000Z",
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
                        "uri": ""
                    }
                }
            })

            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders an article without a read time", async () => {
        act(() => {
            const mocks = generateMocks({
                "id": `ArticleContentItem:1`,
                "title": `Article 1`,
                "htmlContent": "<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
                "summary": "READ THIS GUYS!",
                "readTime": "",
                "publishDate": "2019-09-27T04:00:00.000Z",
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

            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    it("renders an article without a publish date", async () => {
        act(() => {
            const mocks = generateMocks({
                "id": `ArticleContentItem:1`,
                "title": `Article 1`,
                "htmlContent": "<p>This is my really good article on how to be such a Godly man. Your life will be changed if you keep reading.</p>",
                "summary": "READ THIS GUYS!",
                "readTime": "10",
                "publishDate": "",
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

            component = render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})
