import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { GoogleAnalytics } from 'analytics';
import { ContentCard, Row } from 'ui';

const CallsToAction = ({ eventTitle, items, hasEvents }) => {
  if (isEmpty(items)) {
    return null;
  }

  return (
    <>
      {hasEvents && <h3>Get Started</h3>}
      <Row style={{ padding: 0 }}>
        {items.map(({ call, action }, index) => (
          <ContentCard
            title={call}
            redirectUrl={action}
            key={`cta-${index}`}
            id={`cta-${index}`}
            coverImage={[
              {
                name: 'Image name',
                uri:
                  'https://cloudfront.christfellowship.church/GetImage.ashx?guid=80fc6d71-b0c1-45af-a78e-67e91ebd4136',
              },
            ]}
            label={{}}
            onClick={() =>
              GoogleAnalytics.trackEvent({
                category: 'Event Item',
                action: `${eventTitle} Call to Action`,
                label: `${eventTitle} - ${call} Button`,
              })
            }
          />
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
