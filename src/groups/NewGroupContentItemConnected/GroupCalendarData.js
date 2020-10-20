import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { AddToCalendar, Icon } from 'ui';

import dateTextFormat from 'groups/dateTextFormat';

const GroupCalendarData = ({
  title,
  summary,
  address,
  dateTimes,
  calendarLinkDescription,
}) => (
  <div className="my-3">
    <h3
      className="mt-1 content-subtitle font-weight-light"
      style={{ textAlign: 'center' }}
    >
      {dateTextFormat(get(dateTimes, 'start'))}
    </h3>
    <div className="d-flex justify-content-center align-items-center">
      <Icon name="calendar-plus" className="mr-2" />
      <AddToCalendar
        className="p-0 text-dark font-weight-bold"
        style={{
          fontSize: '1.125rem',
          letterSpacing: 'normal',
        }}
        event={{
          title,
          summary,
          // Location is the webUrl for now because we have multiple potential video calls endpoints
          address,
          startTime: dateTimes.start,
          endTime: dateTimes.end,
          description: calendarLinkDescription,
        }}
        alternateDescription={calendarLinkDescription}
      />
    </div>
  </div>
);

GroupCalendarData.propTypes = {
  dateTimes: PropTypes.shape({
    end: PropTypes.string,
    start: PropTypes.string,
  }),
  address: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
  calendarLinkDescription: PropTypes.string,
};

export default GroupCalendarData;
