import React from 'react'
import Navbar, { NavbarWithOpacity } from '../index'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('Navbar', () => {
    it('renders without crashing', () => {
        const renderer = new ShallowRenderer()
        renderer.render(<Navbar />)
        const tree = renderer.getRenderOutput()

        expect(tree).toMatchSnapshot();
    })
})

describe('NavbarWithOpacity', () => {
    it('renders without crashing', () => {
        const renderer = new ShallowRenderer()
        renderer.render(<NavbarWithOpacity />)
        const tree = renderer.getRenderOutput()

        expect(tree).toMatchSnapshot();
    })
})