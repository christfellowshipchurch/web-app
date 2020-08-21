import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { useAuthQuery } from '../../auth';
import { Loader, ErrorBlock } from '../../ui';

import GET_GROUP from '../getGroup';

import GroupContentItem from './GroupContentItem';

const GroupContentItemConnected = ({ itemId }) => {
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { itemId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loader />;
  }

  const content = get(data, 'node', {});

  if (error || (!loading && !content)) {
    console.log({ error }); // eslint-disable-line no-console
    return null;
  }

  console.log(data);
  return (
    <GroupContentItem
      coverImage={get(content, 'coverImage')}
      date={get(content, 'schedule.friendlyScheduleText')}
      title={get(content, 'name')}
      videoCall={get(content, 'videoCall')}
    />
  );
};

GroupContentItemConnected.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default GroupContentItemConnected;
