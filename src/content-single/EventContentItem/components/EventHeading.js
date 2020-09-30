import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { Share, Col, Row } from 'ui';

import LiveIndicator from './LiveIndicator';

const EventHeading = ({ title, summary, isLive }) => (
  <Row className="pt-2 pt-md-3 px-1 pl-lg-2 pl-xl-0">
    {(!isEmpty(title) || !isEmpty(summary)) && (
      <Col>
        <LiveIndicator isLive={isLive} />

        <hgroup className="w-100">
          {!isEmpty(title) && <h1 className="my-2 text-dark">{title}</h1>}
          {!isEmpty(summary) && (
            <h3 className="mt-1 content-subtitle font-weight-light">{summary}</h3>
          )}
        </hgroup>
      </Col>
    )}

    <Col className="col-12 mt-2">
      <div className="d-flex flex-grow-1 justify-content-end">
        <Share shareTitle="Invite" title={title} variant={'outline-dark'} />
      </div>
    </Col>
  </Row>
);

EventHeading.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  isLive: PropTypes.bool,
};

EventHeading.defaultProps = {
  isLive: false,
};

export default EventHeading;
