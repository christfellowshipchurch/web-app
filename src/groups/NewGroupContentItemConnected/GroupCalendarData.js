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
  <div className="mb-3 text-center">
    <h4>Meets {dateTextFormat(get(dateTimes, 'start'))}</h4>
    <div className="d-flex justify-content-center">
      <Icon name="calendar-plus" className="mr-1" fill="#00aeef" />
      <AddToCalendar
        className="p-0 font-weight-bold text-cyan"
        style={{
          fontSize: '0.875rem',
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
