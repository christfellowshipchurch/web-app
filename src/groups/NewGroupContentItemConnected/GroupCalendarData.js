import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get } from 'lodash';

import { baseUnit, themeGet } from 'styles/theme';

import { AddToCalendar, Icon } from 'ui';

import dateTextFormat from 'groups/dateTextFormat';

// :: Styled Components
// ------------------------

const Container = styled.div`
  margin-bottom: ${baseUnit(3)};
  text-align: center;
`;

const Title = styled.h3`
  color: ${themeGet('font.h3')};
`;

const SubTitle = styled.h5`
  color: ${themeGet('font.400')};
`;

// :: Main Component
// ------------------------

const GroupCalendarData = ({
  title,
  summary,
  address,
  dateTime,
  videoCall,
  parentVideoCall,
}) => {
  if (!dateTime) {
    return null;
  }

  const getNotes = () => {
    const hasParentVideoCall = Boolean(parentVideoCall?.link);
    const hasVideoCall = Boolean(videoCall?.link);

    if (!hasParentVideoCall && !hasVideoCall) return null;

    const videoCallNote = videoCall?.link || '';
    const parentVideoCallNote = parentVideoCall?.link || '';
    const notes = `${
      hasParentVideoCall ? `Join Zoom Meeting:\n${parentVideoCallNote}\n\n` : ''
    }Join Zoom ${hasParentVideoCall ? 'Breakout' : ''}Meeting:\n${videoCallNote}`;

    return notes.trim();
  };
  const notes = getNotes();

  return (
    <Container>
      <SubTitle>NEXT MEETING</SubTitle>
      <Title>{dateTextFormat(get(dateTime, 'start'))}</Title>
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
            startTime: dateTime.start,
            endTime: dateTime.end,
            description: notes,
          }}
          alternateDescription={notes}
        />
      </div>
    </Container>
  );
};

GroupCalendarData.propTypes = {
  dateTime: PropTypes.shape({
    end: PropTypes.string,
    start: PropTypes.string,
  }),
  address: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
  calendarLinkDescription: PropTypes.string,
};

export default GroupCalendarData;
