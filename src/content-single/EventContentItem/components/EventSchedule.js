import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { flatMapDepth, identity, uniq, groupBy, keys, get } from 'lodash';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';

import { Card, AddToCalendar, Icon } from 'ui';
import { GoogleAnalytics } from 'analytics';

import EventScheduleTimes from './EventScheduleTimes';

const CampusSelectToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    className="w-100"
    style={{
      verticalAlign: 'middle',
      cursor: 'pointer',
    }}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span className="h4">
      {JSON.stringify(children)}
      <Icon className="ml-2 float-right" name="angle-down" size="22" />
    </span>
  </div>
));

CampusSelectToggle.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
};

CampusSelectToggle.defaultProps = {
  children: {},
  onClick: () => {},
};

const CampusSelection = ({ campuses, onChange, defaultCampus }) => {
  const id = 'event-campus-selection';

  // Defaults to first Campus for now
  const options = [...campuses];
  const [selected, setSelected] = useState(
    options.includes(defaultCampus) ? defaultCampus : options[0]
  );

  // when the selection changes, call the onChange method
  useEffect(() => onChange(selected), [selected]);

  return (
    <Card className="mb-3">
      <Dropdown
        id={id}
        onSelect={(key, e) => {
          e.preventDefault();
          const index = parseInt(key, 10);
          setSelected(options[index]);
        }}
      >
        <Dropdown.Toggle variant="link" id={id} as={CampusSelectToggle}>
          {selected}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((campus, i) => (
            <Dropdown.Item
              key={`CampusSelection:${i}`}
              eventKey={i}
              active={campus === selected}
            >
              {campus}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
};

CampusSelection.propTypes = {
  campuses: PropTypes.object,
  onChange: PropTypes.func,
  defaultCampus: PropTypes.object,
};

CampusSelection.defaultProps = {
  campuses: {},
  onChange: () => {},
  defaultCampus: {},
};

const EventSchedule = ({ defaultCampus, callsToAction, events, title, description }) => {
  const [visibleOccurrences, setVisibleOccurrences] = useState([]);
  const noEvents = events.length < 1;
  console.group('[rkd] EventSchedule render()');
  console.log('[rkd] defaultCampus:', defaultCampus);
  console.log('[rkd] callsToAction:', callsToAction);
  console.log('[rkd] events:', events);

  const campusOptions = uniq(
    flatMapDepth(
      events.map((e) => e.campuses.map((c) => c.name)),
      identity,
      2
    )
  );
  console.log('[rkd] campusOptions:', campusOptions);

  const groupByLocations = groupBy(visibleOccurrences, 'location');
  const groupByLocationDate = keys(groupByLocations).map((l) => {
    const dateTimes = groupBy(groupByLocations[l], (o) =>
      moment(o.start).format('YYYY-MM-DD')
    );

    return { location: l, dateTimes };
  });

  const onChange = (campus) => {
    const campusEvents = events.filter((e) => e.campuses.find((c) => c.name === campus));

    setVisibleOccurrences(campusEvents);
  };

  // Creates a start and end time for Add to Calendar
  // takes the very first and very last time
  const startTime = get(events, '[0].start', null);
  const lastEvent = events.length > 1 ? events.length - 1 : 0;
  const endTime = get(events, `[${lastEvent}].end`, null);

  console.log('[rkd] groupByLocations:', groupByLocations);
  console.groupEnd();
  return (
    <div>
      {!noEvents && (
        <CampusSelection
          key="CampusSelection"
          campuses={campusOptions}
          onChange={onChange}
          defaultCampus={defaultCampus}
        />
      )}

      <div className="p-2 px-3">
        {groupByLocationDate.map((event, i) => {
          const { dateTimes } = event;
          const dateTimesKeys = keys(dateTimes);
          const isLastGroup = i >= groupByLocationDate.length - 1;

          return (
            <div
              key={`EventOccurrence:${i}`}
              className={classnames({
                'border-bottom': isLastGroup,
                'border-light': isLastGroup,
                'mb-3': isLastGroup,
              })}
            >
              {dateTimesKeys.map((date) => (
                <EventScheduleTimes
                  key={`EventOccurrenceDate:${date}`}
                  date={date}
                  times={dateTimes[date]}
                  isOnlyEventTime={dateTimesKeys.length === 1}
                />
              ))}
            </div>
          );
        })}

        {!!noEvents && callsToAction.length > 0 && <h3>Get Started</h3>}

        <div>
          {callsToAction.map((n, i) => (
            <a
              key={i}
              className={classnames('btn', 'btn-primary', 'btn-block', 'my-3')}
              href={n.action}
              target={n.action.includes('http') ? '_blank' : ''}
              onClick={() =>
                GoogleAnalytics.trackEvent({
                  category: 'Event Item',
                  action: `${title} Call to Action`,
                  label: `${title} - ${n.call} Button`,
                })
              }
            >
              {n.call}
            </a>
          ))}
        </div>

        {!noEvents && (
          <div className="d-flex align-items-center">
            <Icon name="calendar-plus" className="mr-2" />
            <AddToCalendar
              className={classnames('p-0', 'text-dark', 'font-weight-bold')}
              style={{
                fontSize: '1.125rem',
                letterSpacing: 'normal',
              }}
              event={{
                title,
                description,
                // Location is the webUrl for now
                address: document.URL,
                startTime,
                endTime,
              }}
              alternateDescription={`Join us for ${title} at Christ Fellowship!`}
              allDay
            />
          </div>
        )}
      </div>
    </div>
  );
};

EventSchedule.propTypes = {
  id: PropTypes.string.isRequired,
  defaultCampus: PropTypes.string,
  callsToAction: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  ).isRequired,
  events: PropTypes.arrayOf(PropTypes.any),
  title: PropTypes.string,
  description: PropTypes.string,
};

EventSchedule.defaultProps = {
  defaultCampus: '',
  callsToAction: [],
  events: [],
  title: '',
  description: '',
};

export default EventSchedule;
