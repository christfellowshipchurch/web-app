import React from 'react'
import {Block, Carousel} from '@christfellowshipchurch/web-ui-kit'
import renderer from "react-test-renderer"

describe("ContentBlock Renderer", () => {
  it("Displays carousel", () => {
    const tree = renderer.create(
     <div className="container">
      <div className="row ">
        <div className="col">
          <Carousel>
              <Block
                  layout='default'
                  media={{
                    imageUrl: '',
                    imageAlt: ''
                  }} >
                  <Block.Title/>
                  <Block.Subtitle/>
                  <Block.Body/>
              </Block>
          </Carousel>
        </div>
      </div>
    </div>
    )
    expect(tree).toMatchSnapshot()
  })
})
