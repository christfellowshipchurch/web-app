import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';
import { useAuth, useAuthQuery } from '../auth';

import {
  Card,
} from '../ui';
import EventSchedule from './EventSchedule';
import EventShare from './EventShare';

import { CAMPUS_KEY } from '../keys';
import { htmlToReactParser } from '../utils';

import { GET_CURRENT_PERSON_CAMPUS } from './queries';

const ConnectedEventSchedule = (props) => {
  const { isLoggedIn } = useAuth();
  const { loading, error, data } = useAuthQuery(GET_CURRENT_PERSON_CAMPUS);

  if (isLoggedIn && (loading || error)) return null;

  const fetchedCampus = get(
    data,
    'currentUser.profile.campus.name',
    localStorage.getItem(CAMPUS_KEY),
  );

  return (
    <EventSchedule
      {...props}
      defaultCampus={fetchedCampus || ''}
    />
  );
};

const EventDetail = ({
  id,
  htmlContent,
  tags,
  callsToAction,
  openLinksInNewTab,
  hideLabel,
  events,
}) => (
    <div className={classnames(
      'container-fluid',
      'my-4',
      'px-3',
    )}
    >
      <div className="row">
        <div className="col-12 col-lg-4 p-2">
          <ConnectedEventSchedule
            id={id}
            callsToAction={callsToAction} 
            openLinksInNewTab={openLinksInNewTab}
            events={events}
            hideLabel={hideLabel}
          />
        </div>

        <div className="col-12 col-lg-8 p-2">
          <Card
            className="py-3"
          >
            <h3 className="text-dark">
              Details
          </h3>
            <div className="mb-5">
              {htmlToReactParser.parse(htmlContent)}
            </div>

            <div className="mx-n1">
              {tags.map((n, i) => (
                <span
                  key={i}
                  className={classnames(
                    'badge',
                    'badge-light',
                    'font-weight-normal',
                    'py-2',
                    'px-3',
                    'mx-1',
                  )}
                >
                  {n}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-12 col-lg-4 p-2">
          <EventShare />
        </div>
      </div> */}
    </div>
  );

EventDetail.propTypes = {
  htmlContent: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.string,
  ),
  callsToAction: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    }),
  ),
};

EventDetail.defaultProps = {
  htmlContent: '',
  tags: [],
  callsToAction: [],
};

export default EventDetail;
