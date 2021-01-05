import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get } from 'lodash';

import { useTheaterModeState } from 'providers/TheaterModeProvider';
import { breakpoint } from 'styles/theme';

import { GridContainer, Row, Col } from 'ui';

import useLiveStreamInteractions from './useLiveStreamInteractions';

import {
  EventBannerBackground,
  EventDescriptionCard,
  EventHeading,
  EventMedia,
  EventPanel,
  CallsToAction,
} from './components';

import EventGroupings from './EventGroupings';

const TheaterContainer = styled.div`
  padding: 16px;
  display: grid;
  gap: 8px;
  grid-template-rows: minmax(450px, auto) auto;
  grid-template-columns: 1fr 300px;
  grid-template-areas:
    'stream stream'
    'heading heading'
    'chat chat'
    'cta cta'
    'social social';

  ${breakpoint('sm')} {
    grid-template-areas:
      'stream stream'
      'heading chat'
      'cta chat'
      'social social';
  }

  ${breakpoint('lg')} {
    grid-template-columns: 1fr 350px;
  }

  ${breakpoint('xl')} {
    grid-template-columns: 1fr 400px;
    grid-template-areas:
      'stream chat'
      'heading chat'
      'cta social';
  }
`;

const Area = styled.div`
  grid-area: ${({ area }) => area};
`;

const EventLiveLayout = ({ contentId, content, liveStream }) => {
  const theaterMode = useTheaterModeState();
  useLiveStreamInteractions(contentId);

  const liveStreamSource = get(liveStream, 'media.sources[0].uri', null);
  const channelId = get(liveStream, 'streamChatChannel.channelId', null);
  const channelType = get(liveStream, 'streamChatChannel.channelType', null);
  const callsToAction = liveStream?.actions || [];

  return (
    <main style={{ minHeight: '75vh' }}>
      <EventBannerBackground {...content} isLive />

      {theaterMode ? (
        <TheaterContainer>
          <Area area="stream">
            <EventMedia
              {...content}
              liveStreamSource={liveStreamSource}
              showTheaterMode={theaterMode}
            />
          </Area>
          <Area area="heading">
            <EventHeading {...content} isLive />
          </Area>
          <Area area="chat">
            <EventPanel
              event={content}
              isLive
              channelId={channelId}
              channelType={channelType}
            />
          </Area>
          <Area area="cta">
            <CallsToAction
              eventTitle={get(content, 'title')}
              eventStartTime={liveStream?.eventStartTime}
              items={callsToAction}
              nodeId={contentId}
            />
          </Area>
          <Area area="social">
            <EventDescriptionCard {...content} theaterMode={theaterMode} />
          </Area>
        </TheaterContainer>
      ) : (
        <GridContainer fluid className="max-width-1100  mx-auto mb-5">
          <Row
            className="flex-column flex-md-row  pt-3 pt-lg-4"
            style={{ minHeight: '30vh' }}
          >
            {/* Main Column */}
            <Col className="col-12 col-lg-8  px-2 px-xl-0 pr-xl-3">
              <EventMedia
                {...content}
                liveStreamSource={liveStreamSource}
                showTheaterMode
              />
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
            <EventGroupings contentId={contentId} />
            <EventDescriptionCard {...content} />
          </Row>
        </GridContainer>
      )}
    </main>
  );
};

EventLiveLayout.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string,
  }),
  contentId: PropTypes.string,
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
