import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import Banner from '../../content-single/Banner';
import { AddToCalendar, Card } from '../../ui';
import { Icon } from '../../ui/Icons';

import dateTextFormat from '../dateTextFormat';

// add any additional parameters to the video urls
const videoCallURLWithParameters = (videoURL, parameters) => {
  const isMSIE = /*@cc_on!@*/ false || !!document.documentMode; //eslint-disable-line spaced-comment
  let urlWithParams = videoURL;

  if (!isMSIE) {
    urlWithParams = new URL(videoURL);

    if (parameters) {
      Object.entries(parameters).map(([key, value]) =>
        urlWithParams.searchParams.set(key, value)
      );
    }

    urlWithParams = urlWithParams.href;
  }

  return urlWithParams;
};

const GroupContentItem = ({
  coverImage,
  dateTimes,
  groupResources,
  onClickGroupResource,
  onClickVideoCall,
  onClickParentVideoCall,
  parentVideoCall,
  summary,
  title,
  userName,
  videoCall,
}) => {
  let calendarLinkDescription = `Join us for ${title} at Christ Fellowship!\n\n`;

  if (parentVideoCall) {
    calendarLinkDescription += get(parentVideoCall, 'labelText') || `Join Meeting`;
    calendarLinkDescription += `\n${get(parentVideoCall, 'link', '')}\n\n`;
  } else if (videoCall) {
    calendarLinkDescription +=
      get(videoCall, 'label') || parentVideoCall ? 'Join Breakout' : 'Join Meeting';

    calendarLinkDescription += `\n${get(videoCall, 'link', '')}`;
  }

  return (
    <>
      <Banner coverImage={coverImage} shareTitle="Invite" title={title} />
      <div className="container-fluid mb-4 px-3">
        <hgroup className="mt-4 mb-3 pb-3">
          <h1 className="mb-2 text-dark">{title}</h1>
          <h3 className="mt-1 content-subtitle font-weight-light">
            {dateTextFormat(get(dateTimes, 'start'))}
          </h3>
        </hgroup>

        <section className="row mx-n2">
          <aside className={classnames('col-12', { 'col-lg-4': summary }, 'p-2')}>
            <Card key="EventOccurences" className="mb-3">
              {get(parentVideoCall, 'link') && (
                <a
                  className="btn btn-primary btn-block mb-3"
                  href={videoCallURLWithParameters(
                    get(parentVideoCall, 'link'),
                    userName
                      ? {
                          uname: userName,
                        }
                      : null
                  )}
                  onClick={() => onClickParentVideoCall('parent')}
                  target="_blank"
                >
                  {get(parentVideoCall, 'labelText') || `Join Meeting`}
                </a>
              )}
              {get(videoCall, 'link') ? (
                <a
                  className="btn btn-primary btn-block mb-3"
                  href={videoCallURLWithParameters(
                    get(videoCall, 'link'),
                    userName
                      ? {
                          uname: userName,
                        }
                      : null
                  )}
                  onClick={() => onClickVideoCall()}
                  target="_blank"
                >
                  {get(videoCall, 'label') || parentVideoCall
                    ? 'Join Breakout'
                    : 'Join Meeting'}
                </a>
              ) : (
                <a
                  // allow to just checkin for in person groups
                  className="btn btn-primary btn-block mb-3"
                  href={''}
                  onClick={() => onClickVideoCall()}
                >
                  Check In
                </a>
              )}
              {groupResources.map((resource, i) => (
                <a
                  key={resource.url}
                  className={classnames('btn', 'btn-outline-dark', 'btn-block', 'my-3')}
                  href={resource.url}
                  onClick={() =>
                    onClickGroupResource({
                      resourceTitle: resource.title,
                    })
                  }
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
                    startTime: dateTimes.start,
                    endTime: dateTimes.end,
                    description: calendarLinkDescription,
                  }}
                  alternateDescription={calendarLinkDescription}
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
};

GroupContentItem.propTypes = {
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }).isRequired,
  dateTimes: PropTypes.shape({
    end: PropTypes.string,
    start: PropTypes.string,
  }),
  groupResources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  onClickGroupResource: PropTypes.func,
  onClickParentVideoCall: PropTypes.func,
  onClickVideoCall: PropTypes.func,
  parentVideoCall: PropTypes.shape({
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
  userName: PropTypes.string,
  videoCall: PropTypes.shape({
    labelText: PropTypes.shape,
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
};

export default GroupContentItem;
