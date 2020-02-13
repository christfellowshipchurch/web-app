import React from 'react'
import Footer from '../Footer'
import ShallowRenderer from 'react-test-renderer/shallow'
import {
    AuthProvider,
} from '../../auth'

describe('Footer', ( ) => {
    it('renders without crashing', () => {
        const renderer = new ShallowRenderer()
        renderer.render(
            // must be wrapped in AuthProvider when component is using useAuth()
            <AuthProvider>
                <Footer />
            </AuthProvider>
            )
        const tree = renderer.getRenderOutput()

        expect(tree).toMatchSnapshot();
    })
})