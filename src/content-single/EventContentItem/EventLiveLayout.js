import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { GridContainer, Row, Col } from 'ui';

import {
  EventBannerBackground,
  EventDescriptionCard,
  EventHeading,
  EventMedia,
  EventPanel,
  EventSchedule,
} from './components';

const EventLiveLayout = ({ content, liveStream }) => {
  const liveStreamSource = get(liveStream, 'media.sources[0].uri', null);
  const channelId = get(liveStream, 'chatChannelId');

  return (
    <main style={{ minHeight: '75vh' }}>
      <EventBannerBackground {...content} isLive />

      <GridContainer fluid className="max-width-1100  mx-auto mb-5">
        <Row
          className="flex-column flex-md-row  pt-3 pt-lg-4"
          style={{ minHeight: '30vh' }}
        >
          {/* Main Column */}
          <Col className="col-12 col-lg-8  px-2 px-xl-0 pr-xl-3">
            <EventMedia {...content} liveStreamSource={liveStreamSource} />
            <EventHeading {...content} isLive />
          </Col>

          {/* Side Column */}
          <Col className="col-12 col-lg-4  mt-3 mt-4-sm mt-lg-0  pr-lg-2 pr-xl-0">
            <EventPanel event={content} channelId={channelId} />
          </Col>
        </Row>

        <Row className="my-2">
          <Col>
            <hr />
          </Col>
        </Row>

        {/* Bottom Half of Page */}
        <Row className="px-3 pr-lg-2 px-xl-0">
          <EventSchedule {...content} />
          <EventDescriptionCard {...content} />
        </Row>
      </GridContainer>
    </main>
  );
};

EventLiveLayout.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string,
  }),
  liveStream: PropTypes.shape({
    media: PropTypes.shape({
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
        })
      ),
    }),
    chatChannelId: PropTypes.string,
  }),
};

EventLiveLayout.defaultProps = {};

export default EventLiveLayout;
