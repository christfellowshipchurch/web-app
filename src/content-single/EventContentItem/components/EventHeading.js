import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import classnames from 'classnames';

import { Share, Col, Row } from 'ui';

import LiveIndicator from './LiveIndicator';

const EventHeading = ({ title, summary, isLive }) => (
  <Row className="pt-2 pt-md-3 px-1 px-lg-2 px-xl-0">
    {(!isEmpty(title) || !isEmpty(summary)) && (
      <Col
        className={classnames({
          'col-8': !isLive,
          'col-12': isLive,
        })}
      >
        <LiveIndicator isLive={isLive} />

        <hgroup className="w-100">
          {!isEmpty(title) && <h1 className="my-2 text-dark">{title}</h1>}
          {!isEmpty(summary) && (
            <h3 className="mt-1 content-subtitle font-weight-light">{summary}</h3>
          )}
        </hgroup>
      </Col>
    )}

    <Col
      className={classnames({
        'col-4': !isLive,
        'col-12 mt-2': isLive,
      })}
    >
      <div className="d-flex flex-grow-1 h-100 justify-content-end align-items-center">
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
