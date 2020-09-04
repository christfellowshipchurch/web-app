import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';
import moment from 'moment';

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

  // TDOD: move this to the API
  const groups = get(data, 'currentUser.profile.groups', []).sort((a, b) =>
    moment(a.dateTime.start).diff(b.dateTime.start)
  );

  return <GroupList isLoading={loading} groups={groups} />;
};

export default GroupListConnected;
