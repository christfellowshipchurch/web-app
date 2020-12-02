import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { Loader, ErrorBlock } from '../../ui';
import ContentCardConnected from '../../content-card-connected';

import { GET_EVENTS } from './queries';

const EventCollection = ({ title, events }) => [
  <div key={`EventCollectionTitle:${title}`} className="row pt-2">
    <div className="col">
      <h1 className="mb-0">{title}</h1>
    </div>
  </div>,
  <div key={`EventCollection:${title}`} className="row mx-n2">
    {events.map((n, i) => (
      <ContentCardConnected
        key={i}
        contentId={n.id}
        urlBase="events"
        className="my-4"
        hideLabel={n.hideLabel}
      />
    ))}
  </div>,
];

EventCollection.propTypes = {
  title: PropTypes.string,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      nextOccurrence: PropTypes.string,
    })
  ),
};

EventCollection.defaultProps = {
  events: [],
};

const EventListConnected = () => {
  const { loading, error, data } = useQuery(GET_EVENTS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <div style={{ position: 'relative', height: '50vh' }}>
        <Loader />
      </div>
    );
  if (error) {
    return <ErrorBlock />;
  }

  //----------- NOTE: Removed FeaturedEvents from Query, only using allEvents for now -------

  // const featuredEvents = get(data, 'featuredEvents.edges', []).map(
  //     ({ node }) => node,
  // );

  // const allEventsSorted = get(data, 'allEvents', []).sort(
  //     (a, b) => b.events.length - a.events.length
  //         || moment(a.nextOccurrence).diff(b.nextOccurrence),
  // );

  //----------- NOTE: Using order of Events given from Rock ----------------

  const allEvents = get(data, 'allEvents', []);

  return (
    <div className="container-fluid my-6 px-4">
      {/* <EventCollection title="Featured Events" events={featuredEvents} />
            <hr /> */}
      <EventCollection title="Events" events={allEvents} />
    </div>
  );
};

export default EventListConnected;
