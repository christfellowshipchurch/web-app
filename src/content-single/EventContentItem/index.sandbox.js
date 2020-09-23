import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';

import { ErrorBlock } from 'ui';
import { LiveConsumer } from 'live/LiveContext';

import {
  EventBannerBackground,
  EventDescriptionCard,
  EventMedia,
  EventPanel,
} from './components';

import EventDetail from './EventDetail';
import Placeholder from './Placeholder';

const EventContentItem = ({ itemId, content, loading, error }) => {
  if (loading && isEmpty(content)) {
    return <Placeholder />;
  }

  if (error || (!loading && isEmpty(content))) {
    console.log({ error });
    return <ErrorBlock />;
  }

  return (
    <LiveConsumer contentId={itemId}>
      {(liveStream) => {
        const isLive = !!(liveStream && liveStream.isLive);
        const liveStreamSource = get(liveStream, 'media.sources[0].uri', null);

        return (
          <div style={{ minHeight: '75vh' }}>
            <EventBannerBackground {...content} />

            <div className="container-fluid max-width-1100 mx-auto">
              <div className="row pt-4 mb-4">
                {/* Main Column */}
                <div className="col-lg-8">
                  <EventMedia
                    {...content}
                    liveStreamSource={liveStreamSource}
                    contentId={itemId}
                    isLive={isLive}
                  />
                  <EventDetail {...content} isLive={isLive} />
                </div>

                {/* Side Column */}
                <div className="col-lg-4">
                  <EventPanel event={content} />
                </div>
              </div>

              <hr />

              <EventDescriptionCard {...content} />
            </div>
          </div>
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
