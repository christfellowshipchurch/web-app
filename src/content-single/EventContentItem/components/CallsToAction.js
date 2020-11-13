import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { GoogleAnalytics } from 'analytics';
import { CallToActionCard, Row } from 'ui';
import { useInteraction, ACTIONS } from 'mutations';
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

// If there is an icon specified, use it.
// Otherwise try to match it with a default icon.
function getIcon(cta) {
  if (cta?.icon) return cta.icon;

  const title = cta?.title;
  if (!title) return undefined;

  if (title.match(/give/i)) return 'gift';
  if (title.match(/connected/i)) return 'connected';
  if (title.match(/decided/i)) return 'check-square';
  return undefined;
}

const CallsToAction = ({ nodeId, eventTitle, items, hasEvents, eventStartTime }) => {
  const [cta, setCTA] = useState(() => filterItems(items, eventStartTime));
  const [interaction] = useInteraction();

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
            icon={getIcon(c) || 'coffee'}
            coverImage={[
              {
                name: c.title,
                uri: c.image,
              },
            ]}
            onClick={() => {
              GoogleAnalytics.trackEvent({
                category: 'Event Item',
                action: `${eventTitle} Call to Action`,
                label: `${eventTitle} - ${c.title} Button`,
              });

              interaction({ variables: { nodeId, action: ACTIONS.VIEWED_ACTION } });
            }}
          />
        ))}
      </Row>
    </>
  );
};

CallsToAction.propTypes = {
  hasEvents: PropTypes.bool,
  eventTitle: PropTypes.string,
  eventStartTime: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  ),
  nodeId: PropTypes.string,
};

CallsToAction.defaultProps = {
  hasEvents: false,
  eventTitle: 'Christ Fellowship Church',
  items: [],
  eventStartTime: Date.now().toString(),
};

export default CallsToAction;
