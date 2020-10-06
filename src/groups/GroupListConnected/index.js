import React from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import moment from 'moment';

import { ErrorBlock } from '../../ui';

import GET_CURRENT_USER_GROUPS from './getCurrentUserGroups';
import GroupList from './GroupList';

const GroupListConnected = ({ isDreamTeam }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER_GROUPS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      inputTypes: isDreamTeam
        ? { includeTypes: 'DreamTeam' }
        : { excludeTypes: 'DreamTeam' },
    },
  });

  if (error) {
    return <ErrorBlock />;
  }

  // Sort groups by date. TDOD: move this to the API
  const groups = isDreamTeam
    ? get(data, 'currentUser.profile.groups', [])
    : get(data, 'currentUser.profile.groups', []).sort((a, b) =>
        moment(a.dateTime.start).diff(b.dateTime.start)
      );

  return (
    <GroupList
      isLoading={loading}
      groups={groups}
      urlBase={isDreamTeam ? 'dream-teams' : 'groups'}
    />
  );
};

GroupListConnected.propTypes = {
  isDreamTeam: PropTypes.bool,
};

GroupListConnected.defaultProps = {
  isDreamTeam: false,
};

export default GroupListConnected;
