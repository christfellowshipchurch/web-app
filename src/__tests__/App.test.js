import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import ShallowRenderer from 'react-test-renderer/shallow'

it('___renders without crashing', () => {
  return
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  it('renders without crashing', () => {
    window.scrollTo = jest.fn()

    const renderer = new ShallowRenderer()
    renderer.render(<App />)
    const tree = renderer.getRenderOutput()

    expect(tree).toMatchSnapshot();
  })
})
