import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';

import { ErrorBlock, GridContainer, Row, Col } from 'ui';
import { LiveConsumer } from 'live/LiveContext';

import { useLocalStorage } from '../../hooks';

import {
  CallsToAction,
  EventBannerBackground,
  EventDescriptionCard,
  EventHeading,
  EventMedia,
  EventPanel,
} from './components';

import Placeholder from './Placeholder';

const EventContentItem = ({ itemId, content, loading, error }) => {
  const { storedValue: theaterMode } = useLocalStorage('theaterMode', false);

  if (loading && isEmpty(content)) return <Placeholder />;
  if (error || (!loading && isEmpty(content))) return <ErrorBlock />;

  return (
    <LiveConsumer contentId={itemId}>
      {(liveStream) => {
        const isLive = get(liveStream, 'isLive', false);
        const liveStreamSource = get(liveStream, 'media.sources[0].uri', null);
        const channelId = get(liveStream, 'chatChannelId');

        return (
          <main style={{ minHeight: '75vh' }}>
            <EventBannerBackground {...content} />

            {theaterMode ? (
              // TODO: edit css for theater mode
              <GridContainer fluid className="max-width-1100  mx-auto mb-5">
                <Row
                  className="flex-column flex-md-row  pt-3 pt-lg-4 mb-4"
                  style={{ minHeight: '30vh' }}
                >
                  {/* Main Column */}
                  <Col className="col-12 col-lg-8  px-2 px-xl-0 pr-xl-3">
                    <EventMedia {...content} liveStreamSource={liveStreamSource} />
                    <EventHeading {...content} isLive={isLive} />
                  </Col>

                  {/* Side Column */}
                  <Col className="col-12 col-lg-4  mt-3 mt-4-sm mt-lg-0  pr-lg-2 pr-xl-0">
                    <EventPanel event={content} isLive={isLive} channelId={channelId} />
                  </Col>
                </Row>

                <CallsToAction
                  eventTitle={get(content, 'title')}
                  items={get(content, 'callsToAction')}
                />

                <EventDescriptionCard {...content} />
              </GridContainer>
            ) : (
              <GridContainer fluid className="max-width-1100  mx-auto mb-5">
                <Row
                  className="flex-column flex-md-row  pt-3 pt-lg-4 mb-4"
                  style={{ minHeight: '30vh' }}
                >
                  {/* Main Column */}
                  <Col className="col-12 col-lg-8  px-2 px-xl-0 pr-xl-3">
                    <EventMedia {...content} liveStreamSource={liveStreamSource} />
                    <EventHeading {...content} isLive={isLive} />
                  </Col>

                  {/* Side Column */}
                  <Col className="col-12 col-lg-4  mt-3 mt-4-sm mt-lg-0  pr-lg-2 pr-xl-0">
                    <EventPanel event={content} isLive={isLive} channelId={channelId} />
                  </Col>
                </Row>

                <CallsToAction
                  eventTitle={get(content, 'title')}
                  items={get(content, 'callsToAction')}
                />

                <hr />

                <EventDescriptionCard {...content} />
              </GridContainer>
            )}
          </main>
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
