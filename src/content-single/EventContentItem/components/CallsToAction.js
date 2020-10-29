import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import classnames from 'classnames';
import { GoogleAnalytics } from 'analytics';
import { Card, Row, Icon } from 'ui';

const CallsToAction = ({ eventTitle, items, hasEvents }) => {
  if (isEmpty(items)) {
    return null;
  }

  return (
    <>
      {hasEvents && <h3>Get Started</h3>}
      <Row>
        {items.map(({ call, action }, index) => (
          <a
            key={`cta-${index}`}
            href={action}
            target={action.includes('http') ? '_blank' : ''}
            onClick={() =>
              GoogleAnalytics.trackEvent({
                category: 'Event Item',
                action: `${eventTitle} Call to Action`,
                label: `${eventTitle} - ${call} Button`,
              })
            }
            className={classnames('col-2', 'my-2', 'mx-2')}
          >
            <Card className={classnames('bg-white')}>
              <div
                className={classnames(
                  'd-flex',
                  'justify-content-center',
                  'align-items-center',
                  'flex-column'
                )}
              >
                <div className="mb-1">
                  <Icon name="church" size={32} />
                </div>
                <div>
                  <span className={classnames('my-3')}>{call}</span>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </Row>
    </>
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
