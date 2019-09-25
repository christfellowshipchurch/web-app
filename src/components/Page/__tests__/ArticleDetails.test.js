import React from "react"
import {
  Accordion,
  Carousel,
  Row,
  Loader,
  Block,
  Media,
  Button
} from "@christfellowshipchurch/web-ui-kit"
import { ContentBlock, GroupBlock } from '../DefaultPage'
import renderer from "react-test-renderer"

describe("ArticleDetails", () => {

  it("renders without crashing", () => {
    const tree = renderer.create(
     <Block>
       <div>
        <Block.Title></Block.Title>
        <Block.Subtitle></Block.Subtitle>
        <Media
          imageUrl="url"
          imageAlt="alt"
        />
          <div>
            <Media
              imageUrl="url"
              imageAlt="alt"
            />
              <div>
                <p></p>
                <p></p>
              </div>
          </div>
        <Block.Body></Block.Body>
       </div>    
     </Block>
    )
    expect(tree).toMatchSnapshot()
  })
});
