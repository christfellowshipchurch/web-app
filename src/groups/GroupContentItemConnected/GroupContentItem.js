import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Banner from '../../content-single/Banner';
import { AddToCalendar, Card } from '../../ui';
import { Icon } from '../../ui/Icons';

const GroupContentItem = ({
  coverImage,
  dateText,
  dateTimes,
  groupResources,
  summary,
  title,
  videoCall,
}) => (
  <>
    <Banner coverImage={coverImage} shareTitle="Invite" title={title} />
    <div className="container-fluid mb-4 px-3">
      <div
        className={classnames('d-md-flex', 'justify-content-between', 'align-items-center', 'pb-3')}
      >
        <div className="mt-4 mb-2 pb-2">
          <h1 className="mb-2 text-dark">{title}</h1>
          <h3 className="mt-1 content-subtitle font-weight-light">{dateText}</h3>
        </div>
        {get(videoCall, 'link') && (
          <a className="btn btn-primary my-3" href={get(videoCall, 'link')} target="_blank">
            Join Meeting
          </a>
        )}
      </div>

      <section className="row mx-n2">
        <aside className="col-12 col-lg-4 p-2">
          <Card key="EventOccurences" className={classnames('mb-3')}>
            {groupResources.map((resource, i) => (
              <a
                key={resource.url}
                className={classnames('btn', 'btn-secondary', 'btn-block', 'my-3')}
                href={resource.url}
                target={resource.url.includes('http') ? '_blank' : ''}
                // onClick={() => GoogleAnalytics.trackEvent({
                //   category: 'Event Item',
                //   action: `${title} Call to Action`,
                //   label: `${title} - ${n.call} Button`
                // })}
              >
                {resource.title}
              </a>
            ))}
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
                  summary,
                  // Location is the webUrl for now
                  address: get(videoCall, 'link'),
                  startTime: dateTimes.state,
                  endTime: dateTimes.end,
                }}
                alternateDescription={`Join us for ${title} at Christ Fellowship!`}
                allDay
              />
            </div>
          </Card>
        </aside>
        <div className="col-12 col-lg-8 p-2">
          <Card>{summary}</Card>
        </div>
      </section>
    </div>
  </>
);

GroupContentItem.propTypes = {
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }).isRequired,
  dateText: PropTypes.string,
  dateTimes: PropTypes.shape({
    end: PropTypes.string,
    start: PropTypes.string,
  }),
  groupResources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
  videoCall: PropTypes.shape({
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
};

GroupContentItem.defaultProps = {
  coverImage: {
    sources: [
      {
        uri: 'https://rock.christfellowship.church/Content/ExternalSite/Banners/GroupsHeader.jpg',
      },
    ],
  },
};

export default GroupContentItem;
