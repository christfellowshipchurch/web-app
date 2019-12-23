import React from 'react'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import moment from 'moment'

import { Loader } from '../../ui'
import ContentCardConnected from '../../content-card-connected'

import { GET_EVENTS } from './queries'

const EventListConnected = () => {
    const { loading, error, data } = useQuery(GET_EVENTS)

    if (loading) return <Loader />
    if (error) return null

    const events = get(data, 'allEvents', [])

    return (
        <div className="container-fluid my-6 px-4">
            <div className="row">
                <div className="col">
                    <h3>
                        Upcoming Events
                    </h3>
                </div>
            </div>

            <div className="row mx-n2">
                {events.map((n, i) =>
                    <ContentCardConnected
                        key={i}
                        contentId={n.id}
                        urlBase='events'
                        label={{
                            field: (node) => {
                                const mStart = moment(get(node, 'startDate', new Date()))
                                let mEnd = null
                                const end = get(node, 'endDate', null)

                                if (end) {
                                    mEnd = moment(end)
                                    const format = mStart.month() === mEnd.month()
                                        ? 'D'
                                        : 'MMM D'

                                    return `${mStart.format('MMM D')} - ${mEnd.format(format)}`
                                }

                                return mStart.format('MMM D')
                            },
                            bg: 'primary',
                            textColor: 'white',
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default EventListConnected