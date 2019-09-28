import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'
import renderer from "react-test-renderer"
import { ARTICLE_LIST_MOCKS, ARTICLE_LIST_ERROR_MOCKS } from './mocks'

import { ArticleList } from '../'

let component = null

describe("ArticleList", () => {

    it("renders without crashing", () => {
        console.log({ ARTICLE_LIST_MOCKS })


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
