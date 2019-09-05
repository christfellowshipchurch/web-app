import React from 'react'
import renderer from "react-test-renderer"
import {Block, Media, Row} from '@christfellowshipchurch/web-ui-kit'
import ContentBlock from '../../ContentBlock'
import FormattedCarousel from '../../FormattedCarousel'
import GroupBlock from '../../GroupBlock'


describe("GroupBlock Renderer", () => {
  it("Displays a Row GroupBlock", () => {
    // const groupLayout = 'row'
    // expect(GroupBlock(groupLayout)).toBe('row')
    const tree = renderer.create(
      <Row>
        <ContentBlock/>
      </Row>  
    )
    expect(tree).toMatchSnapshot()
  })

  it("Displays a Carousel GroupBlock", () => {
    // const groupLayout = 'carousel'
    // expect(GroupBlock(groupLayout)).toBe('carousel')

    const children = [{
            images: '',
            imageAlt: '',
    }]

    const tree = renderer.create(
      <FormattedCarousel children={children} />
    )
    expect(tree).toMatchSnapshot()
  })
})
