import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MediaItem from '../../Media';

configure({ adapter: new Adapter() });

describe('MediaItem', () => {
  it('renders an image with no video', () => {
    const tree = renderer.create(
      <MediaItem imageUrl="https://img.url.com" imageAlt="Image Alt" />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a video with a background image', () => {
    const tree = renderer.create(
      <MediaItem
        videoUrl="https://video.url.com"
        imageUrl="https://img.url.com"
        imageAlt="Image Alt"
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders content overtop of an image', () => {
    const tree = renderer.create(
      <MediaItem imageUrl="https://img.url.com" imageAlt="Image Alt">
        <h1>This is content overtop of an image</h1>
      </MediaItem>
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a rounded media item', () => {
    const tree = renderer.create(
      <MediaItem imageUrl="https://img.url.com" imageAlt="Image Alt" rounded />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a circular media item', () => {
    const tree = renderer.create(
      <MediaItem imageUrl="https://img.url.com" imageAlt="Image Alt" circle />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a media item with manual video controls', () => {
    const tree = renderer.create(
      <MediaItem
        imageUrl="https://img.url.com"
        imageAlt="Image Alt"
        videourl="https://video.url.com"
      />
    );

    expect(tree).toMatchSnapshot();
  });
});
