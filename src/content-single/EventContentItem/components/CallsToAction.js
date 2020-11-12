import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { GoogleAnalytics } from 'analytics';
import { CallToActionCard, Row } from 'ui';

const MINUTE = 60000;

function filterItems(items, eventStartTime) {
  const startTime = new Date(eventStartTime).getTime();
  const currentTime = Date.now();

  const filteredItems = [];
  items.forEach((cta) => {
    const timeDiff = parseInt((currentTime - startTime) / MINUTE, 10);

    // If we should always show it
    if ((cta.start === 0 && cta.duration === 0) || (!cta.start && !cta.duration))
      filteredItems.push(cta);
    // If we show in beginning of stream
    else if (cta.start === 0 && timeDiff < cta.duration) filteredItems.push(cta);
    // If mid-stream
    else if (cta.start < currentTime && timeDiff < cta.start + cta.duration)
      filteredItems.push(cta);
  });

  // Show most recently added items first
  filteredItems.sort((a, b) => {
    const startA = a?.start || 0;
    const startB = b?.start || 0;
    return startB - startA;
  });

  return filteredItems;
}

const CallsToAction = ({ eventTitle, items, hasEvents, eventStartTime }) => {
  const [cta, setCTA] = useState(() => filterItems(items, eventStartTime));

  if (isEmpty(items)) {
    return null;
  }

  setInterval(() => setCTA(filterItems(items, eventStartTime)), MINUTE);

  return (
    <>
      {hasEvents && <h3>Get Started</h3>}
      <Row style={{ padding: 0 }}>
        {cta.map((c, index) => (
          <CallToActionCard
            title={c.title}
            redirectUrl={c.relatedNode.url}
            key={`cta-${index}`}
            id={`cta-${index}`}
            coverImage={[
              {
                name: c.title,
                uri: c.image,
              },
            ]}
            label={{}}
            onClick={() =>
              GoogleAnalytics.trackEvent({
                category: 'Event Item',
                action: `${eventTitle} Call to Action`,
                label: `${eventTitle} - ${c.title} Button`,
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
  eventStartTime: PropTypes.number,
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
  eventStartTime: Date.now(),
};

export default CallsToAction;
