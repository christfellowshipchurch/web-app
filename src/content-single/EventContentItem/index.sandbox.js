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
        const isLive = get(liveStream, 'isLive', false);
        const liveStreamSource = get(liveStream, 'media.sources[0].uri', null);
        const channelId = get(liveStream, 'chatChannelId');

        return (
          <div style={{ minHeight: '75vh' }}>
            <EventBannerBackground {...content} />

            <div className="container-fluid max-width-1100  mx-auto mb-5">
              <div
                className="row  flex-column flex-md-row  pt-3 pt-lg-4 mb-4"
                style={{ minHeight: '30vh' }}
              >
                {/* Main Column */}
                <div className="col-12 col-lg-8  px-2 px-xl-3">
                  <EventMedia {...content} liveStreamSource={liveStreamSource} />
                  <EventDetail {...content} isLive={isLive} />
                </div>

                {/* Side Column */}
                <div className="col-12 col-lg-4  mt-3 mt-4-sm mt-lg-0  pr-lg-2 pr-xl-3">
                  <EventPanel event={content} isLive={isLive} channelId={channelId} />
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
