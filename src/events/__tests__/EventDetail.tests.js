import React from 'react'
import { act, render } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'

import { AuthProvider } from '../../auth'
import EventDetail from '../EventDetail'
import { Events } from '../../data-mocks'

const { TEST_EVENT_JSON } = Events

let component = null

describe('EventDetail', () => {
    it("renders Event Details", async () => {
        act(() => {
            component = render(
                <MockedProvider
                    mocks={[
                    ]}
                    addTypename={false}
                >
                    <AuthProvider>
                        <EventDetail {...TEST_EVENT_JSON} />
                    </AuthProvider>
                </MockedProvider>
            )
        })

        await wait(0) // waits for response

        const { container } = component
        expect(container).toMatchSnapshot()
    })
})