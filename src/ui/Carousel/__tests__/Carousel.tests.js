import React from 'react'
import renderer from "react-test-renderer"
import Carousel from '../Carousel'
import Media from '../../Media'

describe("ContentBlock Renderer", () => {
  it("Displays carousel", () => {
    const tree = renderer.create(
     <div className="container">
      <div className="row ">
        <div className="col">
          <Carousel>
            <Media
              imageAlt=''
              imageUrl=''
            />
          </Carousel>
        </div>
      </div>
    </div>
    )
    expect(tree).toMatchSnapshot()
  })
})
