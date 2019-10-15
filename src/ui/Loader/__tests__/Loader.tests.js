import React from 'react'
import Loader from '../../Loader'
import renderer from 'react-test-renderer'

describe('Loader', () => {
    it('renders the ring loader as the default loader', () => {
        const tree = renderer.create(<Loader />)

        expect(tree).toMatchSnapshot()
    })

    it('renders an accordion styled loader', () => {
        const tree = renderer.create(<Loader.Accordion />)

        expect(tree).toMatchSnapshot()
    })

    it('renders a content styled loader', () => {
        const tree = renderer.create(<Loader.Content />)

        expect(tree).toMatchSnapshot()
    })
})