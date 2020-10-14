import React from 'react';
import PropTypes from 'prop-types';

import { get, isEmpty, isNil } from 'lodash';

import { ErrorBlock } from 'ui';
import { LiveConsumer } from 'live/LiveContext';

import EventLayout from './EventLayout';
import EventLiveLayout from './EventLiveLayout';
import Placeholder from './Placeholder';

const EventContentItem = ({ itemId, content, loading, error }) => {
  const missingContent = isEmpty(content) || isNil(content);

  if (loading && missingContent) return <Placeholder />;
  if (error || (!loading && missingContent)) return <ErrorBlock />;

  return (
    <LiveConsumer contentId={itemId}>
      {(liveStream) => {
        const isLive = get(liveStream, 'isLive', false);
        return isLive ? (
          <EventLiveLayout content={content} liveStream={liveStream} />
        ) : (
          <EventLayout content={content} />
        );
      }}
    </LiveConsumer>
  );
};

EventContentItem.propTypes = {
  itemId: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.string,
  }),
  loading: PropTypes.bool,
  error: PropTypes.any,
};

EventContentItem.defaultProps = {};

export default EventContentItem;
