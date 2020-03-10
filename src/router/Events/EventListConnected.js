import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import moment from 'moment'

import { Loader } from '../../ui'
import ContentCardConnected from '../../content-card-connected'

import { GET_EVENTS } from './queries'

const EventCollection = ({ title, events }) => ([
    <div
        key={`EventCollectionTitle:${title}`}
        className="row pt-2"
    >
        <div className="col">
            <h3 className='mb-0'>
                {title}
            </h3>
        </div>
    </div>,
    <div
        key={`EventCollection:${title}`}
        className="row mx-n2"
    >
        {events.map((n, i) =>
            <ContentCardConnected
                key={i}
                contentId={n.id}
                urlBase='events'
                className='my-4'
                hideLabel={n.hideLabel}
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
])

EventCollection.propTypes = {
    title: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        nextOccurrence: PropTypes.string,
    }))
}

EventCollection.defaultProps = {
    events: []
}

const EventListConnected = () => {
    const { loading, error, data } = useQuery(GET_EVENTS)

    if (loading) return <div style={{ position: 'relative', height: '50vh' }}><Loader /></div>
    if (error) return <div className="p-2 p-md-5">
        <div className="alert alert-danger" role="alert">
            There was an error loading the content. Please try reloading the page.
        </div>
    </div>

    const featuredEvents = get(data, 'featuredEvents.edges', []).map(
        ({ node }) => node
    )
    const allEventsSorted = get(data, 'allEvents', []).sort(
        (a, b) =>
            b.events.length - a.events.length ||
            moment(a.nextOccurrence).diff(b.nextOccurrence)
    );

    return (
        <div className="container-fluid my-6 px-4">
            <EventCollection title="Featured Events" events={featuredEvents} />
            <hr />
            <EventCollection title="All Events and Opportunities" events={allEventsSorted} />
        </div>
    )
}

export default EventListConnected