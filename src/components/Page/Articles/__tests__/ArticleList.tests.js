import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import renderer from "react-test-renderer"
import { ARTICLE_LIST_MOCKS } from './mocks'

import { ArticleList } from '../'

describe("ArticleList", () => {

    it("renders the final state", async () => {
        const tree = renderer.create(
            <MockedProvider mocks={[ARTICLE_LIST_MOCKS]} addTypename={false}>
                <ArticleList />
            </MockedProvider>
        )

        await wait(0)

        const tree = component.toJSON()
        expect(tree.children).toContain('Click on an article below to read it')
    })

    it("renders the loading", async () => {
        const tree = renderer.create(
            <MockedProvider mocks={[]} addTypename={false}>
                <ArticleList />
            </MockedProvider>
        )

        await wait(0)

        const tree = component.toJSON()
        expect(tree.children).toContain('Loading...')
    })
})
