import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty, flatMapDepth, identity, uniq, groupBy, keys, get } from 'lodash';
import moment from 'moment';

import { AddToCalendar, Icon } from 'ui';

import EventScheduleTimes from './EventScheduleTimes';
import CampusSelector from './CampusSelector';
import CallsToAction from './CallsToAction';

function getScheduleByLocation(events) {
  console.group('[schedule] getScheduleByLocation()');
  console.log('[schedule] events:', events);

  if (!events || isEmpty(events)) {
    console.log('[schedule] Empty events... returning []');
    console.groupEnd();
    return [];
  }

  const groupByLocations = groupBy(events, 'location');
  const groupByLocationDates = keys(groupByLocations).map((location) => {
    const dateTimes = groupBy(groupByLocations[location], (o) =>
      moment(o.start).format('YYYY-MM-DD')
    );

    return { location, dateTimes };
  });

  console.log('[schedule] groupByLocationDates:', groupByLocationDates);
  console.groupEnd();
  return groupByLocationDates;
}

const EventSchedule = ({ defaultCampus, callsToAction, events, title, description }) => {
  const [campusEvents, setCampusEvents] = useState([]);
  const hasEvents = !isEmpty(events);
  const scheduleByLocation = getScheduleByLocation(campusEvents);

  console.groupCollapsed('[schedule] EventSchedule render()');
  console.log('[schedule] events:', events);
  console.log('[schedule] callsToAction:', callsToAction);
  console.log('[schedule] defaultCampus:', defaultCampus);
  console.log('[schedule] ---');
  console.log('[schedule] campusEvents:', campusEvents);
  console.log('[schedule] scheduleByLocation:', scheduleByLocation);

  const campusOptions = uniq(
    flatMapDepth(
      events.map((e) => e.campuses.map((c) => c.name)),
      identity,
      2
    )
  );
  console.log('[schedule] campusOptions:', campusOptions);

  const handleChangeCampus = (campus) => {
    const campusEvents = events.filter((e) => e.campuses.find((c) => c.name === campus));
    setCampusEvents(campusEvents);
  };

  // Creates a start and end time for Add to Calendar
  // takes the very first and very last time
  const startTime = get(events, '[0].start', null);
  const lastEvent = hasEvents ? events.length - 1 : 0;
  const endTime = get(events, `[${lastEvent}].end`, null);

  console.log('[schedule] ---');
  console.log('[schedule] startTime:', startTime);
  console.log('[schedule] endTime:', endTime);
  console.groupEnd();

  return (
    <section>
      {hasEvents && (
        <CampusSelector
          key="CampusSelector"
          campuses={campusOptions}
          defaultCampus={defaultCampus}
          onChange={handleChangeCampus}
        />
      )}

      <div className="p-2 px-3">
        {scheduleByLocation.map((event, i) => {
          const { dateTimes } = event;
          const dateTimesKeys = keys(dateTimes);
          const isLastGroup = i >= scheduleByLocation.length - 1;

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

        {hasEvents && !isEmpty(callsToAction) && <h3>Get Started</h3>}

        <CallsToAction eventTitle={title} items={callsToAction} />

        {hasEvents && (
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
    </section>
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
  ),
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
