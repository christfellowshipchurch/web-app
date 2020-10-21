import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import { get } from 'lodash';
import moment from 'moment';

import { GoogleAnalytics } from 'analytics';
import { ErrorBlock, generateUrlLink, Loader } from 'ui';

import ADD_ATTENDANCE from './addAttendance';
import GET_GROUP from './getGroup';
import NewGroup from './NewGroup';

function getGroupResources(resources) {
  return resources.map((resource) => {
    let resourceURL = get(resource, 'relatedNode.url', '');

    if (resource.action === 'READ_CONTENT') {
      const urlBase =
        resource.relatedNode.__typename === 'InformationalContentItem'
          ? 'items'
          : 'content';

      const { href } = generateUrlLink({
        urlBase,
        id: resource.relatedNode.id,
        title: resource.title,
      });

      resourceURL = href;
    }

    return {
      title: resource.title,
      url: resourceURL,
    };
  });
}

const NewGroupContentItemConnected = ({ itemId }) => {
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { itemId },
    // fetchPolicy: 'cache-and-network',
  });

  const [handleAttend] = useMutation(ADD_ATTENDANCE);

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
      handleAttend({ variables: { id: itemId } });
    }
  };

  const resources = getGroupResources(get(content, 'groupResources', []));
  console.log('[rkd] content:', content);
  return (
    <NewGroup
      coverImage={get(content, 'coverImage')}
      title={get(content, 'title')}
      members={get(content, 'members', [])}
      dateTime={get(content, 'dateTime')}
    />
  );
  // return (
  //   <Group
  //     {...(get(content, 'coverImage') ? { coverImage: content.coverImage } : {})}
  //     dateTimes={get(content, 'dateTime')}
  //     groupResources={getGroupResources}
  //     onClickGroupResource={handleOnClickGroupResource}
  //     onClickParentVideoCall={handleOnClickVideoCall}
  //     onClickVideoCall={handleOnClickVideoCall}
  //     parentVideoCall={get(content, 'parentVideoCall')}
  //     summary={get(content, 'summary')}
  //     title={get(content, 'title')}
  //     userName={
  //       get(data, 'currentUser.profile.nickName') ||
  //       get(data, 'currentUser.profile.firstName')
  //     }
  //     videoCall={get(content, 'videoCall')}
  //     channelId={get(content, 'chatChannelId')}
  //     members={get(content, 'members')}
  //   />
  // );

  return <h1>hey</h1>;
};

NewGroupContentItemConnected.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default NewGroupContentItemConnected;
