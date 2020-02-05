import React from 'react'
import Footer from '../Footer'
import ShallowRenderer from 'react-test-renderer/shallow'



describe('Footer', ( ) => {

    it('renders without crashing', async () => {
        const renderer = new ShallowRenderer()
        renderer.render(
                <Footer />
            )
        const tree = renderer.getRenderOutput()

        expect(tree).toMatchSnapshot();
    })
})