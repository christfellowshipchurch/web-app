import React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import renderer from "react-test-renderer"
import { GET_ARTICLE_BY_TITLE } from './mocks'

import { ArticleDetail } from '..'

describe("ArticleDetail", () => {

    it("renders without crashing", () => {
        const tree = renderer.create(
            <MockedProvider mocks={GET_ARTICLE_BY_TITLE} addTypename={false}>
                <ArticleDetail match={{ params: { articleTitle: 'article-1' } }} />
            </MockedProvider>
        )

        expect(tree).toMatchSnapshot()
    })
})
