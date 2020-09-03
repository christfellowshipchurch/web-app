import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { ErrorBlock } from '../../ui';

import GET_CURRENT_USER_GROUPS from './getCurrentUserGroups';
import GroupList from './GroupList';

const GroupListConnected = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER_GROUPS, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <ErrorBlock />;
  }

  return (
    <GroupList isLoading={loading} groups={get(data, 'currentUser.profile.groups', [])} />
  );
};

export default GroupListConnected;
