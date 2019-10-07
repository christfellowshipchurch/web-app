import React from "react"
import {
  Accordion,
  Carousel,
  Row,
  ,
  Block,
  Button
} from "@christfellowshipchurch/web-ui-kit"
import Media from '../../../ui/Media'
import { ContentBlock, GroupBlock } from '../DefaultPage'
import renderer from "react-test-renderer"

describe("DefaultPage", () => {

  //Content Blocks
  it("renders ContentBlock with background layout with Media in background", () => {
    const tree = renderer.create(
      <Media
        imageUrl=''
        imageAlt=''
      >
        <Block>
        </Block>
      </Media>
    );
    expect(tree).toMatchSnapshot();
  });
  it("renders ContentBlock without background layout", () => {
    const tree = renderer.create(
      <Block>
        <Block.Subtitle />
        <Block.Title />
        <Block.Body />
      </Block>
    );
    expect(tree).toMatchSnapshot();
  });


  //BlockItem and GroupItem
  it("renders single Block", () => {
    const tree = renderer.create(
      <div>
        <ContentBlock />
      </div>
    );
    expect(tree).toMatchSnapshot();
  });
  it("renders a groupItem", () => {
    const tree = renderer.create(
      <div>
        <GroupBlock />
      </div>
    );
    expect(tree).toMatchSnapshot();
  });
});
