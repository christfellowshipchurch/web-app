import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'
import {
    set
} from 'lodash'

import {
    Articles
} from '../../../../data-mocks'
import { TopThreeArticles } from '..'

const {
    TOP_THREE_ARTICLES_MOCKS,
    TOP_THREE_ARTICLES_ERROR
} = Articles

let component = null

describe("TopThreeArticles", () => {
    it("renders without crashing", () => {
        act(() => {
            render(
                <MockedProvider mocks={[TOP_THREE_ARTICLES_MOCKS]} addTypename={false}>
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
                <MockedProvider mocks={[TOP_THREE_ARTICLES_ERROR]}>
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
                <MockedProvider mocks={[TOP_THREE_ARTICLES_MOCKS]} addTypename={false}>
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
            const mocks = TOP_THREE_ARTICLES_MOCKS

            set(mocks, 'result.data.getArticles', [])

            component = render(
                <MockedProvider mocks={[mocks]} addTypename={false}>
                    <TopThreeArticles />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})