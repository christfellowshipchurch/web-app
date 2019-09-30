import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'

import {
    Articles
} from '../../../../data-mocks'
import { ArticleList } from '../'

const {
    ARTICLE_LIST_MOCKS,
    ARTICLE_LIST_ERROR,
} = Articles

let component = null

describe("ArticleList", () => {
    it("renders without crashing", () => {
        act(() => {
            render(
                <MockedProvider
                    mocks={[
                        ARTICLE_LIST_MOCKS
                    ]}
                    addTypename={false}
                >
                    <ArticleList />
                </MockedProvider>
            )
        })
    })

    it("renders a list of articles", async () => {
        act(() => {
            component = render(
                <MockedProvider
                    mocks={[
                        ARTICLE_LIST_MOCKS
                    ]}
                    addTypename={false}
                >
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
                <MockedProvider
                    mocks={[
                        ARTICLE_LIST_ERROR
                    ]}
                >
                    <ArticleList />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})
