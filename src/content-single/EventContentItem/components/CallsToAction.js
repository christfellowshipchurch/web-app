import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { GoogleAnalytics } from 'analytics';

import { Row, Col } from 'ui';

const CallsToAction = ({ eventTitle, items }) => {
  if (isEmpty(items)) {
    return null;
  }

  return (
    <Row className="px-3 px-xl-0">
      <Col className="mb-2">
        <h3>Get Started</h3>
      </Col>
      <Col className="col-12 px-lg-2">
        <Row>
          {items.map(({ call, action }, index) => (
            <Col className="col-12 col-sm-6 col-lg-4  px-1 pb-2 px-lg-2 pb-lg-3">
              <a
                key={`cta-${index}`}
                className={'btn btn-primary btn-block h-100  px-2 px-lg-3'}
                href={action}
                target={action.includes('http') ? '_blank' : ''}
                onClick={() =>
                  GoogleAnalytics.trackEvent({
                    category: 'Event Item',
                    action: `${eventTitle} Call to Action`,
                    label: `${eventTitle} - ${call} Button`,
                  })
                }
              >
                {call}
              </a>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

CallsToAction.propTypes = {
  eventTitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  ),
};

export default CallsToAction;
