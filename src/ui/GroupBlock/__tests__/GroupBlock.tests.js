import React from 'react'
// import renderer, { act } from "react-test-renderer"
import { MockedProvider } from '@apollo/react-testing'
import { act, render } from '@testing-library/react'

import GroupBlock from '../GroupBlock'
import { WebBlocks } from '../../../data-mocks'

const {
  GET_GROUP_ITEM_MOCK
} = WebBlocks

let component = null

describe("GroupBlock Renderer", () => {
  it("Displays a Row GroupBlock", async () => {
    act(() => {
      component = render(
        <MockedProvider
          mocks={[
            GET_GROUP_ITEM_MOCK
          ]}
          addTypename={false}
        >
          <GroupBlock
            groupLayout='row'
          />
        </MockedProvider>
      )
    })
    const { container } = component
    expect(container).toMatchSnapshot()
  })

  it("Displays a Accordion GroupBlock", async () => {
    act(() => {
      component = render(
        <MockedProvider
          mocks={[
            GET_GROUP_ITEM_MOCK
          ]}
          addTypename={false}
        >
          <GroupBlock
            groupLayout='accordion'
          />
        </MockedProvider>
      )
    })
    const { container } = component
    expect(container).toMatchSnapshot()
  })

  it("Displays a Carousel GroupBlock", async () => {
    act(() => {
      component = render(
        <MockedProvider
          mocks={[
            GET_GROUP_ITEM_MOCK
          ]}
          addTypename={false}
        >
          <GroupBlock
            groupLayout='carousel'
          />
        </MockedProvider>
      )
    })
    const { container } = component
    expect(container).toMatchSnapshot()
  })
})
