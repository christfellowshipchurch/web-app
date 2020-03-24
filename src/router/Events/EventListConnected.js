import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';
import moment from 'moment';

import { Loader, ContentCard } from '../../ui';
import ContentCardConnected from '../../content-card-connected';

import { GET_EVENTS } from './queries';

const EventCollection = ({ title, events }) => ([
    <div
        key={`EventCollectionTitle:${title}`}
        className="row pt-2"
    >
        <div className="col">
            <h3 className="mb-0">
                {title}
            </h3>
        </div>
    </div>,
    <div
        key={`EventCollection:${title}`}
        className="row mx-n2"
    >
        {events.map((n, i) => (
            <ContentCardConnected
                key={i}
                contentId={n.id}
                urlBase="events"
                className="my-4"
                {...n}
            />
        ))}
    </div>,
]);

EventCollection.propTypes = {
    title: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        nextOccurrence: PropTypes.string,
    })),
};

EventCollection.defaultProps = {
};

const EventListConnected = () => {
    const { loading, error, data } = useQuery(GET_EVENTS, { fetchPolicy: 'cache-and-network' });

    if (loading) return <div style={{ position: 'relative', height: '50vh' }}><Loader /></div>;
    if (error) {
        return (
            <div className="p-2 p-md-5">
                <div className="alert alert-danger" role="alert">
                    There was an error loading the content. Please try reloading the page.
        </div>
            </div>
        );
    }

    const featuredEvents = get(data, 'featuredEvents.edges', []).map(
        ({ node }) => node,
    );

    return (
        <div className="container-fluid my-6 px-4">
            <EventCollection title="Featured Events" events={featuredEvents} />
            <hr />
            <EventCollection title="Upcoming Events" events={get(data, 'allEvents', [])} />
        </div>
    );
};

export default EventListConnected;
