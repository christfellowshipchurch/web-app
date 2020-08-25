import React from 'react';
import renderer from 'react-test-renderer';
import { Block, Media } from '../../../ui';

describe('ContentBlock Renderer', () => {
  it('Displays ContentBlock with Media displaying in the background', () => {
    const tree = renderer.create(
      <Media imageUrl="" imageAlt="">
        <Block>
          <Block.Title />
          <Block.Subtitle />
          <Block.Body />
        </Block>
      </Media>
    );
    expect(tree).toMatchSnapshot();
  });

  it('Displays ContentBlock with normal layout', () => {
    const tree = renderer.create(
      <div className="container">
        <div className="row">
          <Block imageUrl="" imageAlt="">
            <Block.Subtitle />
            <Block.Title />
            <Block.Body />
          </Block>
        </div>
      </div>
    );
    expect(tree).toMatchSnapshot();
  });
});
