import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';
import { useAuth, useAuthQuery } from '../../auth';

import {
  Card,
} from '../../ui';
import EventSchedule from './EventSchedule';

import { CAMPUS_KEY } from '../../keys';
import { htmlToReactParser } from '../../utils';

import { GET_CURRENT_PERSON_CAMPUS } from './queries';
import { Icon } from '../../ui/Icons';

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
  isLive
}) => (
    <div className={classnames(
      'container-fluid',
      'mb-4',
      'px-3',
    )}
    >
      {(title !== ''
        || summary !== '')
        && (
          <div className="mt-4 mb-2">
            {isLive &&
            <div
              className={classnames(
                'bg-danger', 
                'card',
                'p-2',
                'mb-3',
                'col-6',
                'col-md-2', 
                'flex-row',
                'align-items-center',
                'justify-content-center'
              )}
            >
              <Icon 
                name='live-dot'
                fill='white'
                size='8'
              />
              <h4
                className={classnames(
                  'text-white',
                  'text-center',
                  'text-uppercase',
                  'mb-0',
                  'ml-2'
                )}
              >
                live now
              </h4>
              </div>
            }
            <h1 className="mb-2 text-dark">
              {title}
            </h1>
            <h3 className="mt-1 content-subtitle font-weight-light">
              {summary}
            </h3>
          </div>
        )}

      <div className="row mx-n2">
        <div className="col-12 col-lg-4 p-2">
          <ConnectedEventSchedule
            id={id}
            callsToAction={callsToAction}
            openLinksInNewTab={openLinksInNewTab}
            events={events}
            title={title}
            description={htmlContent}
          />
        </div>

        <div className="col-12 col-lg-8 p-2">
          <Card>
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
