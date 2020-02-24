import React from 'react'
import { act, render } from '@testing-library/react'
import wait from 'waait'

import { AuthProvider } from '../../auth'
import EventSchedule from '../EventSchedule'
import { Events } from '../../data-mocks'

const { TEST_EVENT_JSON } = Events

let component = null

describe('EventSchedule', () => {
    it("renders the schedule of an event", async () => {
        component = render(
            <AuthProvider>
                <EventSchedule {...TEST_EVENT_JSON} />
            </AuthProvider>
        )

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})