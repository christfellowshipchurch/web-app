import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';
import { useAuth, useAuthQuery } from '../../auth';

import { Card, Share } from '../../ui';

import { CAMPUS_KEY } from '../../keys';
import { htmlToReactParser } from '../../utils';

import { GET_CURRENT_PERSON_CAMPUS } from './queries';
import EventSchedule from './EventSchedule';

import LiveIndicator from './components/LiveIndicator';

const ConnectedEventSchedule = (props) => {
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

const EventDetail = ({
  id,
  title,
  summary,
  htmlContent,
  tags,
  callsToAction,
  openLinksInNewTab,
  events,
  isLive,
}) => (
  <div className={classnames('container-fluid', 'mb-4', 'px-3')}>
    {(title !== '' || summary !== '') && (
      <div
        className={classnames(
          'd-md-flex',
          'justify-content-between',
          'align-items-center',
          'pb-3'
        )}
      >
        <div className="mt-4 mb-2 pb-2">
          <LiveIndicator isLive={isLive} />
          <h1 className="mb-2 text-dark">{title}</h1>
          <h3 className="mt-1 content-subtitle font-weight-light">{summary}</h3>
        </div>
        <Share shareTitle="Invite" title={title} variant={'outline-dark'} />
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
          <div className="">{htmlToReactParser.parse(htmlContent)}</div>

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
                  'mx-1'
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
  id: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  htmlContent: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  callsToAction: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  ),
  openLinksInNewTab: PropTypes.bool,
  events: PropTypes.object,
  isLive: PropTypes.bool,
};

EventDetail.defaultProps = {
  id: '',
  title: '',
  summary: '',
  htmlContent: '',
  tags: [],
  callsToAction: [],
  openLinksInNewTab: false,
  events: {},
  isLive: false,
};

export default EventDetail;
