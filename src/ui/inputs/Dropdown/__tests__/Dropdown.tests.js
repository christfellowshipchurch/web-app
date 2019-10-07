import React from 'react'
import renderer from 'react-test-renderer'
import {
    configure, mount,
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Dropdown from '../index'

configure({ adapter: new Adapter() })

describe('Dropdown', () => {
    it('renders a Dropdown without crashing', () => {
        const tree = renderer.create(
            <Dropdown
                label="Label"
                description="Description" />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a Dropdown with a placeholder', () => {
        const tree = renderer.create(
            <Dropdown
                label="Label"
                description="Description"
                placeholder="Placeholder" />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a Dropdown with a prefix', () => {
        const tree = renderer.create(
            <Dropdown
                label="Label"
                description="Description"
                prefix={<div style={{ background: 'red', height: 20, width: 20 }}></div>} />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a Dropdown with a suffix', () => {
        const tree = renderer.create(
            <Dropdown
                label="Label"
                description="Description"
                suffix={<div style={{ background: 'red', height: 20, width: 20 }}></div>} />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a Dropdown with an error', () => {
        const tree = renderer.create(
            <Dropdown
                label="Label"
                description="Description"
                error="Here's an error" />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a Dropdown with using success', () => {
        const tree = renderer.create(
            <Dropdown
                label="Label"
                description="Description"
                withSuccess />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a disabled Dropdown', () => {
        const tree = renderer.create(
            <Dropdown
                label="Label"
                description="Description"
                disabled />
        )

        expect(tree).toMatchSnapshot()
    })

    it('simulates the click of a Dropdown', () => {
        const wrapper = mount(
            <Dropdown
                label="Label"
                description="Description" />
        )
        const select = wrapper.find('select')

        // Finds the select and clicks it
        select.simulate('focus')
        wrapper.update()

        expect(wrapper).toMatchSnapshot()

        // Removes focus
        select.simulate('blur')
        wrapper.update()

        expect(wrapper).toMatchSnapshot()
    })

    it('simulates the mouse enter and leave of a Dropdown', () => {
        const wrapper = mount(
            <Dropdown
                label="Label"
                description="Description" />
        )
        const select = wrapper.find('select')

        // Mouse Enters
        select.simulate('mouseenter')
        wrapper.update()

        expect(wrapper).toMatchSnapshot()

        // Mouse leaves
        select.simulate('mouseleave')
        wrapper.update()

        expect(wrapper).toMatchSnapshot()
    })

    it('simulates the mouse enter and leave of a Dropdown', () => {
        const wrapper = mount(
            <Dropdown
                label="Label"
                description="Description" />
        )
        const select = wrapper.find('select')

        // Types in the select
        select.simulate('change', { target: { value: 'My new value' } })
        wrapper.update()

        expect(wrapper).toMatchSnapshot()
    })
})