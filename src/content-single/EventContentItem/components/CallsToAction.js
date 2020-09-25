import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';

import { GoogleAnalytics } from 'analytics';

const CallsToAction = ({ eventTitle, items }) => {
  if (isEmpty(items)) {
    return null;
  }

  return (
    <div>
      {items.map(({ call, action }, index) => (
        <a
          key={`cta-${index}`}
          className={classnames('btn', 'btn-primary', 'btn-block', 'my-3')}
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
  eventTitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  ),
};

export default CallsToAction;
