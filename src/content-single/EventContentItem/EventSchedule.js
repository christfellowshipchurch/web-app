import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  flatMapDepth,
  identity,
  uniq,
  uniqBy,
  groupBy,
  keys,
  get,
  includes,
  toLower,
} from 'lodash';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';

import { Card, AddToCalendar } from '../../ui';
import { Icon } from '../../ui/Icons';
// import { getDirectionsUrl } from '../../utils';
import { GoogleAnalytics } from '../../analytics';

const EventTimes = ({ date, times, className }) => {
  const mDate = moment(date);
  const currentUtcOffset = moment().format('ZZ');

  return (
    <div className={classnames('d-flex', 'flex-column', className)}>
      <div>
        <h3 className="d-flex align-items-center">
          <Icon name="calendar-alt" className="mr-2" />
          {mDate.format('ddd MMM D')}
        </h3>
      </div>
      {uniqBy(times, 'start')
        .sort((a, b) => moment(a.start).diff(moment(b.start)))
        .map((t) => {
          const utc = moment.utc(t.start);
          const local = moment(utc).utcOffset(currentUtcOffset);

          return (
            <div key={`${date}:${t.start}`}>
              <h4 className="font-weight-normal d-flex align-items-center">
                <Icon name="clock" className="mr-2" />
                {local.format('LT')}
              </h4>
            </div>
          );
        })}
    </div>
  );
};

EventTimes.propTypes = {
  date: PropTypes.string,
  times: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};

EventTimes.defaultProps = {
  date: '',
  times: [],
  className: '',
};

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
      {children}
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
  // const selectLocation = 'Select Location';
  // const options = [selectLocation, ...campuses]

  // Defaults to first Campus for now
  const options = [...campuses];
  const [selected, setSelected] = useState(
    options.includes(defaultCampus) ? defaultCampus : options[0]
  );

  // when the selection changes, call the onChange method
  // eslint-disable-next-line
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
          {options.map((c, i) => (
            <Dropdown.Item
              key={`CampusSelection:${i}`}
              eventKey={i}
              active={c === selected}
            >
              {c}
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

const EventSchedule = ({
  defaultCampus,
  callsToAction,
  // openLinksInNewTab,
  events,
  title,
  description,
}) => {
  const [visibleOccurrences, setVisibleOccurrences] = useState([]);
  const noEvents = events.length < 1;

  const campusOptions = uniq(
    flatMapDepth(
      events.map((e) => e.campuses.map((c) => c.name)),
      identity,
      2
    )
  );
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

  //Creates a start and end time for Add to Calendar
  // takes the very first and very last time
  const startTime = get(events, '[0].start', null);
  const lastEvent = events.length > 1 ? events.length - 1 : 0;
  const endTime = get(events, `[${lastEvent}].end`, null);
  //TEMPORARY Easter messaging
  const isEaster = includes(toLower(title), 'easter');

  return (
    <>
      {!noEvents && (
        <CampusSelection
          key="CampusSelection"
          campuses={campusOptions}
          onChange={onChange}
          defaultCampus={defaultCampus}
        />
      )}
      <Card key="EventOccurences" className={classnames('mb-3')}>
        <div className="">
          {groupByLocationDate.map((event, i) => {
            // const { location, dateTimes } = event;
            const { dateTimes } = event;
            return (
              <div
                key={`EventOccurence:${i}`}
                className={classnames({
                  'border-bottom': i < groupByLocationDate.length - 1,
                  'border-light': i < groupByLocationDate.length - 1,
                  'mb-3': i < groupByLocationDate.length - 1,
                })}
              >
                {keys(dateTimes).map((date) => (
                  <EventTimes
                    key={`EventOccurenceDate:${date}`}
                    date={date}
                    times={dateTimes[date]}
                    className={classnames({
                      'mb-4': keys(dateTimes).length > 1,
                    })}
                  />
                ))}

                {/* <div className="my-3">
                  <h4
                    className="mb-2"
                  >
                    Address
                  </h4>
                  <a
                    className="text-dark"
                    href={getDirectionsUrl(location)}
                    target="_blank"
                  >
                    {location}
                  </a>
                </div> */}
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
                alternateDescription={
                  isEaster
                    ? `Tune in to an online Easter service at Christ Fellowship via your phone, laptop, or TV. \n\n To view an online Easter service, click the link below.`
                    : `Join us for ${title} at Christ Fellowship!`
                }
                allDay
              />
            </div>
          )}
        </div>
      </Card>
    </>
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
  events: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
};

EventSchedule.defaultProps = {
  defaultCampus: '',
  callsToAction: [],
  events: {},
  title: '',
  description: '',
};

export default EventSchedule;
