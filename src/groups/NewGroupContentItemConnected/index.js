import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { first, get } from 'lodash';
import moment from 'moment';

import { GoogleAnalytics } from 'analytics';
import { ErrorBlock, Loader } from 'ui';
import { useCheckIn } from 'hooks';

import GET_GROUP from './getGroup';
import NewGroup from './NewGroup';

const NewGroupContentItemConnected = ({ itemId }) => {
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { itemId },
    fetchPolicy: 'cache-and-network',
  });

  const { options, checkInCurrentUser } = useCheckIn({
    nodeId: itemId,
  });

  const userCheckIn = () => {
    if (options.length > 0) {
      const closestCheckInOption = first(
        options.sort((a, b) => Math.abs(moment(a).diff(b)))
      );

      if (closestCheckInOption.id) {
        checkInCurrentUser({ optionId: closestCheckInOption.id });
      }
    }
  };

  // When refetching data upon group edit,
  // we don't want to show the loader again
  if (loading && !data) {
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

  const handleOnClickVideoCall = (action) => {
    GoogleAnalytics.trackEvent({
      category: 'Groups',
      action: action ? `${action} Video Call` : 'Video Call',
      label: `${get(content, 'title')}`,
    });
    // Check to see if the current date is the date of the meeting before taking attendance.
    if (
      moment(get(content, 'dateTime.start', null)).format('MMDDYYYY') ===
      moment().format('MMDDYYYY')
    ) {
      userCheckIn();
    }
  };

  return (
    <NewGroup
      coverImage={get(content, 'coverImage')}
      title={get(content, 'title')}
      summary={get(content, 'summary')}
      members={get(content, 'members', [])}
      leaders={get(content, 'leaders', []) || []}
      groupResources={get(content, 'resources', [])}
      dateTime={get(content, 'dateTime')}
      userName={
        get(data, 'currentUser.profile.nickName') ||
        get(data, 'currentUser.profile.firstName')
      }
      userId={get(data, 'currentUser.id')}
      videoCall={get(content, 'videoCall')}
      parentVideoCall={get(content, 'parentVideoCall')}
      channelId={get(content, 'streamChatChannel.channelId')}
      chatChannelType={get(content, 'streamChatChannel.channelType', 'group')}
      onClickGroupResource={handleOnClickGroupResource}
      onClickVideoCall={handleOnClickVideoCall}
      id={itemId}
    />
  );
};

NewGroupContentItemConnected.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default NewGroupContentItemConnected;
