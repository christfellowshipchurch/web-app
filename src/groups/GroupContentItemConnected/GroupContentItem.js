import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Banner from '../../content-single/Banner';
import { AddToCalendar, Card } from '../../ui';
import { Icon } from '../../ui/Icons';

// add any additional parameters to the video urls
const videoCallURLWithParameters = (videoURL, parameters) => {
  const isMSIE = /*@cc_on!@*/ false || !!document.documentMode; //eslint-disable-line spaced-comment
  let urlWithParams = videoURL;

  if (!isMSIE) {
    urlWithParams = new URL(videoURL);

    Object.entries(parameters).map(([key, value]) => urlWithParams.searchParams.set(key, value));

    urlWithParams = urlWithParams.href;
  }

  return urlWithParams;
};

const GroupContentItem = ({
  coverImage,
  dateText,
  dateTimes,
  groupResources,
  parentVideoCall,
  summary,
  title,
  videoCall,
}) => (
  <>
    <Banner coverImage={coverImage} shareTitle="Invite" title={title} />
    <div className="container-fluid mb-4 px-3">
      <hgroup className="mt-4 mb-3 pb-3">
        <h1 className="mb-2 text-dark">{title}</h1>
        <h3 className="mt-1 content-subtitle font-weight-light">{dateText}</h3>
      </hgroup>

      <section className="row mx-n2">
        <aside className="col-12 col-lg-4 p-2">
          <Card key="EventOccurences" className="mb-3">
            {get(parentVideoCall, 'link') && (
              <a
                className="btn btn-primary btn-block mb-3"
                href={videoCallURLWithParameters(get(parentVideoCall, 'link'), {
                  uname: 'Marty McFly',
                })}
                target="_blank"
              >
                Join Meeting
              </a>
            )}
            {get(videoCall, 'link') && (
              <a
                className="btn btn-primary btn-block mb-3"
                href={videoCallURLWithParameters(get(videoCall, 'link'), { uname: 'Marty McFly' })}
                target="_blank"
              >
                {parentVideoCall ? 'Join Breakout' : 'Join Meeting'}
              </a>
            )}
            {groupResources.map((resource, i) => (
              <a
                key={resource.url}
                className={classnames('btn', 'btn-outline-dark', 'btn-block', 'my-3')}
                href={resource.url}
                target={resource.url.includes('http') ? '_blank' : ''}
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
                  // Location is the webUrl for now because we have multiple potential video calls endpoints
                  address: document.URL,
                  startTime: dateTimes.state,
                  endTime: dateTimes.end,
                }}
                alternateDescription={`Join us for ${title} at Christ Fellowship!`}
                allDay
              />
            </div>
          </Card>
        </aside>
        {summary ? (
          <div className="col-12 col-lg-8 p-2">
            <Card>{summary}</Card>
          </div>
        ) : null}
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
  parentVideoCall: PropTypes.shape({
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
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
