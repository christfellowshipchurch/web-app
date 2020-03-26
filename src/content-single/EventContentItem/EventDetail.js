import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';
import { useAuth, useAuthQuery } from '../../auth';

import {
  Card, Button
} from '../../ui';
import EventSchedule from './EventSchedule';
import EventShare from './EventShare'

import { CAMPUS_KEY } from '../../keys';
import { htmlToReactParser } from '../../utils';

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
  title,
  summary,
  htmlContent,
  tags,
  callsToAction,
  openLinksInNewTab,
  events,
}) => {
  const [ showShareCard, setShowShareCard ] = useState(false)

  return(
      <div className={classnames(
        'container-fluid',
        'mb-4',
        'px-3',
      )}
      >
        <div
          className={classnames(
            'row',
            'd-flex',
            'align-items-center',
            'justify-content-between'
          )}
        >
          {(title !== ''
            || summary !== '')
            && (
              <div className="mt-4 mb-2">
                <h1 className="mb-2 text-dark">
                  {title}
                </h1>
                <h3 className="mt-1 content-subtitle font-weight-light">
                  {summary}
                </h3>
              </div>
            )}
            <div>
              <Button 
                onClick={() => setShowShareCard(true)}
                title='Invite'
              />
            </div>
        </div>
        <div className="row mx-n2">
          <div className="col-12 col-lg-4 p-2">
            <ConnectedEventSchedule
              id={id}
              callsToAction={callsToAction}
              openLinksInNewTab={openLinksInNewTab}
              events={events}
            />
          </div>

          <div className="col-12 col-lg-8 p-2">
            <Card
              className=""
            >
              <h3 className="text-dark">
                Details
            </h3>
              <div className="">
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

        <div className="row">
          <div className="col-12 col-lg-4 p-2">
            {showShareCard &&
              <EventShare 
                title={title}
                onPressExit={() => setShowShareCard(false)}
              />
            }
          </div>
        </div>
      </div>
    )};

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
