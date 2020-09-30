import React from 'react';
import { get } from 'lodash';
import { useAuth, useAuthQuery } from 'auth';

import { CAMPUS_KEY } from 'keys';
import { GET_CURRENT_PERSON_CAMPUS } from '../queries';

import EventSchedule from './EventSchedule';

const EventScheduleConnected = (props) => {
  const { isLoggedIn } = useAuth();
  const { loading, error, data } = useAuthQuery(GET_CURRENT_PERSON_CAMPUS);

  if (isLoggedIn && (loading || error)) return null;

  const fetchedCampus = get(
    data,
    'currentUser.profile.campus.name',
    localStorage.getItem(CAMPUS_KEY)
  );

  return <EventSchedule {...props} defaultCampus={fetchedCampus || ''} />;
};

EventScheduleConnected.propTypes = EventSchedule.propTypes;
EventScheduleConnected.defaultProps = EventSchedule.defaultProps;

export default EventScheduleConnected;
