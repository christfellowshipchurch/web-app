import React from 'react'
import ButtonRow from '..'
import renderer from 'react-test-renderer'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Button } from '../../../ui'

configure({ adapter: new Adapter() })

describe('Button', () => {
    it('renders a ButtonRow without crashing', () => {
        const tree = renderer.create(
            <ButtonRow
                callToAction={{ call: 'Title', action: '/action' }}
                secondaryCallToAction={{ call: 'Title', action: '/action' }}
            />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a ButtonRow without a callToAction', () => {
        const tree = renderer.create(
            <ButtonRow
                secondaryCallToAction={{ call: 'Title', action: '/action' }}
            />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a ButtonRow without secondaryCallToAction', () => {
        const tree = renderer.create(
            <ButtonRow
                callToAction={{ call: 'Title', action: '/action' }}
            />
        )

        expect(tree).toMatchSnapshot()
    })

    it('renders a ButtonRow with an incomplete callToAction object', () => {
        const treeCall = renderer.create(
            <ButtonRow
                callToAction={{ call: 'Title', action: '' }}
            />
        )

        expect(treeCall).toMatchSnapshot()

        const treeAction = renderer.create(
            <ButtonRow
                callToAction={{ call: '', action: '/action' }}
            />
        )

        expect(treeAction).toMatchSnapshot()
    })
})