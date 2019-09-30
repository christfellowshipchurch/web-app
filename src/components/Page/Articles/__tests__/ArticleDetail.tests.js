import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'
import { set } from 'lodash'

import {
    Articles
} from '../../../../data-mocks'
import { ArticleDetail } from '..'

const {
    ARTICLE_DETAIL_MOCK,
    ARTICLE_DETAIL_ERROR,
    ARTICLE_CATEGORIES_MOCK,
    ARTICLE_CATEGORIES_ERROR
} = Articles

let component = null

const conditionalFields = [
    { key: 'title', value: 'title' },
    { key: 'summary', value: 'summary' },
    { key: 'image', value: 'images[0].sources[0].uri' },
    { key: 'author image', value: 'author.photo.uri' },
    { key: 'readTime', value: 'readTime' },
    { key: 'publishDate', value: 'publishDate' },
]

describe("ArticleDetail", () => {
    it("renders without crashing", () => {
        act(() => {
            render(
                <MockedProvider
                    mocks={[
                        ARTICLE_DETAIL_MOCK,
                        ARTICLE_CATEGORIES_MOCK
                    ]}
                    addTypename={false}
                >
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })
    })

    // Loading States
    it("renders an article", async () => {
        act(() => {
            component = render(
                <MockedProvider
                    mocks={[
                        ARTICLE_DETAIL_MOCK,
                        ARTICLE_CATEGORIES_MOCK
                    ]}
                    addTypename={false}
                >
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
                <MockedProvider
                    mocks={[
                        ARTICLE_DETAIL_ERROR,
                        ARTICLE_CATEGORIES_ERROR
                    ]}
                >
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
            const mocks = ARTICLE_DETAIL_MOCK

            mocks.result.data.getArticleByTitle = null

            component = render(
                <MockedProvider mocks={[mocks]} addTypename={false}>
                    <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    conditionalFields.forEach(n => {
        it(`renders an article without ${n.key}`, async () => {
            act(() => {
                const mocks = ARTICLE_DETAIL_MOCK

                set(mocks, `result.data.getArticleByTitle.${n.value}`, '')

                component = render(
                    <MockedProvider
                        mocks={[mocks, ARTICLE_CATEGORIES_MOCK]}
                        addTypename={false}
                    >
                        <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
                    </MockedProvider>
                )
            })

            await wait(0) // waits for response

            const { container } = component
            expect(container).toMatchSnapshot()
        })
    })
})
