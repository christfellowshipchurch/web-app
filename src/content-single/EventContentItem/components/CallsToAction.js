import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { GoogleAnalytics } from 'analytics';
import { ContentCard, Row } from 'ui';

const MINUTE = 60000;

function filterItems(items, startTime) {
  const currentTime = Date.now();
  const filteredItems = [];
  items.forEach((cta) => {
    const timeDiff = currentTime - startTime;
    // If we should always show it
    if (
      (cta.start === 0 && cta.duration === 0) ||
      (cta.start === undefined && cta.duration === undefined)
    )
      filteredItems.push(cta);
    // If we show in beginning
    else if (cta.start === 0 && timeDiff < cta.duration) filteredItems.push(cta);
    // If mid-stream
    else if (cta.start < currentTime && timeDiff < cta.start + cta.duration)
      filteredItems.push(cta);
  });
  return filteredItems;
}

const CallsToAction = ({ eventTitle, items, hasEvents, startTime }) => {
  const [cta, setCTA] = useState(() => filterItems(items, startTime));

  if (isEmpty(items)) {
    return null;
  }

  setInterval(() => setCTA(filterItems(items, startTime)), MINUTE);

  return (
    <>
      {hasEvents && <h3>Get Started</h3>}
      <Row style={{ padding: 0 }}>
        {cta.map(({ call, action }, index) => (
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
  startTime: PropTypes.number,
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
  startTime: Date.now(),
};

export default CallsToAction;
