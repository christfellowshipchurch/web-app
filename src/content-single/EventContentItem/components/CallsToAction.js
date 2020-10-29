import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { GoogleAnalytics } from 'analytics';

const CallsToAction = ({ eventTitle, items, hasEvents }) => {
  if (isEmpty(items)) {
    return null;
  }

  return (
    <div>
      {hasEvents && <h3>Get Started</h3>}
      {items.map(({ call, action }, index) => (
        <a
          key={`cta-${index}`}
          className={'btn btn-primary btn-block my-3'}
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
      ))}
    </div>
  );
};

CallsToAction.propTypes = {
  hasEvents: PropTypes.bool,
  eventTitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  ),
};

CallsToAction.defaultProps = {
  hasEvents: false,
  eventTitle: 'Christ Fellowship Church',
  items: [],
};

export default CallsToAction;
