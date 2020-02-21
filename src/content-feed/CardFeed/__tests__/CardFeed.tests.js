import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'
import wait from 'waait'

import { CardFeed as CardFeedMocks } from '../../../data-mocks'
import CardFeed from '../'

const {
    SIBLING_ITEM_FEED_MOCK,
    CHILD_ITEM_FEED_MOCK,
    CHILD_CHANNEL_FEED_MOCK,
    EMPTY_RESULTS_MOCK,
    ITEM_ID,
    CHANNEL_ID,
    FEED_ERROR
} = CardFeedMocks

let component = null

describe('CardFeed', () => {
    // Sibling Feed
    it("renders a sibling feed from a content item", async () => {
        act(() => {
            component = render(
                <MockedProvider
                    mocks={[
                        SIBLING_ITEM_FEED_MOCK
                    ]}
                    addTypename={false}
                >
                    <CardFeed id={ITEM_ID} connection="sibling" title="Sibling Feed" />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    // Child Feed
    it("renders a child feed from a content item", async () => {
        act(() => {
            component = render(
                <MockedProvider
                    mocks={[
                        CHILD_ITEM_FEED_MOCK
                    ]}
                    addTypename={false}
                >
                    <CardFeed id={ITEM_ID} connection="child" title="Child Feed" />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    // Content Channel Child Feed
    it("renders a child feed from a content channel", async () => {
        act(() => {
            component = render(
                <MockedProvider
                    mocks={[
                        CHILD_CHANNEL_FEED_MOCK
                    ]}
                    addTypename={false}
                >
                    <CardFeed id={CHANNEL_ID} title="Channel Feed" />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    // Edge Cases
    it("receives 0 results back from the server", async () => {
        act(() => {
            component = render(
                <MockedProvider
                    mocks={[
                        EMPTY_RESULTS_MOCK
                    ]}
                    addTypename={false}
                >
                    <CardFeed id={CHANNEL_ID} title="Channel Feed" />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })

    // Loading States
    it("renders the loading state", () => {
        act(() => {
            component = render(
                <MockedProvider mocks={[]}>
                    <CardFeed id={ITEM_ID} />
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
                        FEED_ERROR
                    ]}
                >
                    <CardFeed id={ITEM_ID} />
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})