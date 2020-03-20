import React from 'react'
import Navbar, { NavbarWithOpacity } from '../index'
import ShallowRenderer from 'react-test-renderer/shallow'
import { AuthProvider } from '../../auth'


describe('Navbar', () => {
    it('renders without crashing', () => {
        const renderer = new ShallowRenderer()
        renderer.render(
            <AuthProvider>
                <Navbar />
            </AuthProvider>
        )
        const tree = renderer.getRenderOutput()

        expect(tree).toMatchSnapshot();
    })
})

describe('NavbarWithOpacity', () => {
    it('renders without crashing', () => {
        const renderer = new ShallowRenderer()
        renderer.render(
            <AuthProvider>
                <NavbarWithOpacity />
            </AuthProvider>
        )
        const tree = renderer.getRenderOutput()

        expect(tree).toMatchSnapshot();
    })
})