import React from 'react'
import Button from '..'
import renderer from 'react-test-renderer'

describe('Button', () => {
    // Deprecated Props
    it('renders a Default Button with deprecated properties', () => {
        const tree = renderer.create(
            <Button
                title="Button Title"
                onClick={() => true}
            />
        )

        expect(tree).toMatchSnapshot()
    })

    // Button Types
    it('renders a Default Button without crashing', () => {
        const tree = renderer.create(
            <Button
                title="Button Title"
                onClick={() => true}
            />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a Link Button without crashing', () => {
        const tree = renderer.create(
            <Button
                type="link"
                title="Button Title"
                onClick={() => true}
            />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a Light Button without crashing', () => {
        const tree = renderer.create(
            <Button
                type="light"
                title="Button Title"
                onClick={() => true}
            />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a Dark Button without crashing', () => {
        const tree = renderer.create(
            <Button
                type="dark"
                title="Button Title"
                onClick={() => true}
            />
        )

        expect(tree).toMatchSnapshot()
    })

    // Button Size
    it('renders a Button with a size override', () => {
        const tree = renderer.create(
            <Button
                size="lg"
                title="Button Title"
                onClick={() => true}
            />
        )

        expect(tree).toMatchSnapshot()
    })
})