import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

// import { useAuthQuery } from '../../auth';
import { Loader, ErrorBlock } from '../../ui';

import GET_GROUP from '../getGroup';

import GroupContentItem from './GroupContentItem';

const GroupContentItemConnected = ({ itemId }) => {
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { itemId },
    fetchPolicy: 'cache-and-network',
  });

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

  console.log(data);
  return (
    <GroupContentItem
      {...(get(content, 'coverImage') ? { coverImage: content.coverImage } : {})}
      dateText={get(content, 'schedule.friendlyScheduleText')}
      dateTimes={get(content, 'dateTime')}
      summary={get(content, 'summary')}
      title={get(content, 'name')}
      videoCall={get(content, 'videoCall')}
      groupResources={get(content, 'groupResources')}
    />
  );
};

GroupContentItemConnected.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default GroupContentItemConnected;
