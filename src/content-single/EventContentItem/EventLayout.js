import React from 'react';
import PropTypes from 'prop-types';

import { GridContainer, Row, Col } from 'ui';

import {
  EventBannerBackground,
  EventDescriptionCard,
  EventHeading,
  EventMedia,
} from './components';

import EventGroupings from './EventGroupings';

const EventLayout = ({ contentId, content }) => {
  return (
    <main style={{ minHeight: '75vh' }}>
      <EventBannerBackground {...content} />

      <GridContainer fluid className="max-width-1100  mx-auto mb-5  pt-6 px-3">
        <Row>
          <Col>
            <EventMedia {...content} />
            <EventHeading {...content} />
          </Col>
        </Row>

        <Row className="mt-4">
          <EventGroupings contentId={contentId} />
          <EventDescriptionCard {...content} />
        </Row>
      </GridContainer>
    </main>
  );
};

EventLayout.propTypes = {
  contentId: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.string,
  }),
};

EventLayout.defaultProps = {};

export default EventLayout;
