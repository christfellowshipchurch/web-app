import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import { get } from 'lodash';

import { GoogleAnalytics } from '../../analytics';
// import { useAuthQuery } from '../../auth';
import { Loader, ErrorBlock } from '../../ui';

import ATTEND_MEETING from './attendMeeting';
import GET_GROUP from './getGroup';
import GroupContentItem from './GroupContentItem';

const GroupContentItemConnected = ({ itemId }) => {
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { itemId },
    fetchPolicy: 'cache-and-network',
  });

  const [handleAttend] = useMutation(ATTEND_MEETING);

  if (loading) {
    return (
      <div style={{ height: '50vh', width: '100vw', position: 'relative' }}>
        <Loader />
      </div>
    );
  }

  const content = get(data, 'node', {});

  if (error || (!loading && !content)) {
    console.log({ error }); // eslint-disable-line no-console
    return <ErrorBlock />;
  }

  const handleOnClickGroupResource = ({ resourceTitle }) => {
    GoogleAnalytics.trackEvent({
      category: 'Groups',
      action: 'Resource',
      label: `${get(content, 'title')} - ${resourceTitle}`,
    });
  };

  const handleOnClickVideoCall = (action) => () => {
    GoogleAnalytics.trackEvent({
      category: 'Groups',
      action: action ? `${action} Video Call` : 'Video Call',
      label: `${get(content, 'title')}`,
    });

    handleAttend({ variables: { id: itemId } });
  };

  return (
    <GroupContentItem
      {...(get(content, 'coverImage') ? { coverImage: content.coverImage } : {})}
      dateText={get(content, 'schedule.friendlyScheduleText')}
      dateTimes={get(content, 'dateTime')}
      groupResources={get(content, 'groupResources')}
      onClickGroupResource={handleOnClickGroupResource}
      onClickParentVideoCall={handleOnClickVideoCall('parent')}
      onClickVideoCall={handleOnClickVideoCall()}
      parentVideoCall={get(content, 'parentVideoCall')}
      summary={get(content, 'summary')}
      title={get(content, 'title')}
      userName={get(data, 'currentUser.profile.firstName')}
      videoCall={get(content, 'videoCall')}
    />
  );
};

GroupContentItemConnected.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default GroupContentItemConnected;
