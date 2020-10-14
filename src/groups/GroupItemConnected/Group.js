import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import GroupBannerBackground from './GroupBannerBackground';
import GroupContent from './GroupContent';

const GroupItem = ({
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
  channelId,
  groupId,
  members,
}) => {
  let calendarLinkDescription = `Join us for ${title} at Christ Fellowship!\n\n`;

  const videos = [];
  if (parentVideoCall) {
    const label = get(parentVideoCall, 'labelText') || `Join Meeting`;
    calendarLinkDescription += label;
    calendarLinkDescription += `\n${get(parentVideoCall, 'link', '')}\n\n`;
    videos.push({
      label,
      userName,
      videoCall: parentVideoCall,
      onClick: () => onClickParentVideoCall('parent'),
      link: get(parentVideoCall, 'link'),
    });
  }

  if (videoCall) {
    let label = 'Check In';
    if (get(videoCall, 'labelText')) {
      label = get(videoCall, 'labelText');
    } else if (parentVideoCall) {
      label = 'Join Breakout';
    } else if (get(videoCall, 'link')) {
      label = 'Join Meeting';
    }

    // Only add to the calendar link description
    // If we haven't already added to it from parent video call
    if (!parentVideoCall) {
      calendarLinkDescription += label;
      calendarLinkDescription += `\n${get(videoCall, 'link', '')}`;
    }

    videos.push({
      label,
      userName,
      videoCall,
      onClick: () => onClickVideoCall(),
      link: get(videoCall, 'link', ''),
    });
  }

  return (
    <>
      <GroupBannerBackground coverImage={coverImage} title={title} />
      <GroupContent
        calendarLinkDescription={calendarLinkDescription}
        onClickGroupResource={onClickGroupResource}
        dateTimes={dateTimes}
        groupResources={groupResources}
        summary={summary}
        title={title}
        channelId={channelId}
        groupId={groupId}
        coverImage={coverImage}
        videos={videos}
        members={members}
      ></GroupContent>
    </>
  );
};

GroupItem.propTypes = {
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
  channelId: PropTypes.string,
  groupId: PropTypes.string,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      nickName: PropTypes.string,
      photo: PropTypes.shape({
        uri: PropTypes.string,
      }),
    })
  ),
};

export default GroupItem;
