import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from '../index';

configure({ adapter: new Adapter() });

describe('TextInput', () => {
  it('renders a Text Input without crashing', () => {
    const tree = renderer.create(<TextInput label="Label" description="Description" />);

    expect(tree).toMatchSnapshot();
  });

  it('renders a Text Input with a placeholder', () => {
    const tree = renderer.create(
      <TextInput label="Label" description="Description" placeholder="Placeholder" />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a Text Input with a prefix', () => {
    const tree = renderer.create(
      <TextInput
        label="Label"
        description="Description"
        prefix={<div style={{ background: 'red', height: 20, width: 20 }}></div>}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a Text Input with a suffix', () => {
    const tree = renderer.create(
      <TextInput
        label="Label"
        description="Description"
        suffix={<div style={{ background: 'red', height: 20, width: 20 }}></div>}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a Text Input with an error', () => {
    const tree = renderer.create(
      <TextInput label="Label" description="Description" error="Here's an error" />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a Text Input with using success', () => {
    const tree = renderer.create(
      <TextInput label="Label" description="Description" withSuccess />
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled Text Input', () => {
    const tree = renderer.create(
      <TextInput label="Label" description="Description" disabled />
    );

    expect(tree).toMatchSnapshot();
  });

  it('simulates the click of a Text Input', () => {
    const wrapper = mount(<TextInput label="Label" description="Description" />);
    const input = wrapper.find('input');

    // Finds the input and clicks it
    input.simulate('focus');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    // Removes focus
    input.simulate('blur');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  it('simulates the mouse enter and leave of a Text Input', () => {
    const wrapper = mount(<TextInput label="Label" description="Description" />);
    const input = wrapper.find('input');

    // Mouse Enters
    input.simulate('mouseenter');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();

    // Mouse leaves
    input.simulate('mouseleave');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  it('simulates the mouse enter and leave of a Text Input', () => {
    const wrapper = mount(<TextInput label="Label" description="Description" />);
    const input = wrapper.find('input');

    // Types in the input
    input.simulate('change', { target: { value: 'My new value' } });
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
