import React from 'react';
import PropTypes from 'prop-types';

import { useMutation } from 'react-apollo';
import { UPDATE_GROUP_IMAGE } from '../mutations';
import { Button } from '../../ui';
import GroupCalendarData from './GroupCalendarData';
import GroupChat from './GroupChat';
import GroupEventOccurrences from './GroupEventOccurrences';
import GroupImage from './GroupImage';
import GroupMembers from './GroupMembers';
import GroupResources from './GroupResources';
import GroupSummary from './GroupSummary';
import GroupTitle from './GroupTitle';

const GroupContent = ({
  dateTimes,
  groupResources,
  onClickGroupResource,
  summary,
  title,
  videos,
  channelId,
  calendarLinkDescription,
  coverImage,
  members,
  id,
}) => {
  const [updatePhoto] = useMutation(UPDATE_GROUP_IMAGE);
  return (
    <div className="container-fluid mb-4 pt-6 px-3">
      <div className="row">
        <div className="col-6 bg-white p-3">
          <GroupImage coverImage={coverImage} title={title} />
          <Button
            onClick={() => updatePhoto({ variables: { groupId: id, image: 'hi' } })}
            title="Yo"
          />
          <GroupMembers members={members} />
          <GroupResources
            groupResources={groupResources}
            onClick={onClickGroupResource}
          />
        </div>
        <div className="col-6 bg-white p-3">
          <GroupTitle title={title} />
          <GroupSummary summary={summary} />
          <GroupCalendarData
            title={title}
            summary={summary}
            address={document.URL}
            dateTimes={dateTimes}
            calendarLinkDescription={calendarLinkDescription}
          ></GroupCalendarData>
          <GroupEventOccurrences videos={videos} />
          <GroupChat channelId={channelId} />
        </div>
      </div>
    </div>
  );
};

GroupContent.propTypes = {
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
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
  userName: PropTypes.string,
  channelId: PropTypes.string,
  calendarLinkDescription: PropTypes.string,
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      userName: PropTypes.string,
      onClick: PropTypes.func,
      link: PropTypes.string,
    })
  ),
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
  id: PropTypes.string,
};

export default GroupContent;
