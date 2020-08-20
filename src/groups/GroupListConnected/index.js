import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { ContentCard, ErrorBlock, Loader } from '../../ui';

import GET_CURRENT_USER_GROUPS from '../getCurrentUserGroups';

const GroupListConnected = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER_GROUPS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '50vh' }}>
        <Loader />
      </div>
    );
  }
  if (error) {
    return <ErrorBlock />;
  }

  const currentUserGroups = get(data, 'currentUser.profile.groups', []);

  return (
    <div className="row mx-n2">
      {currentUserGroups.map((n) => (
        <ContentCard
          key={n.id}
          urlBase="groups"
          className="my-4"
          coverImage={get(n, 'coverImage.sources', '')}
          title={get(n, 'title', '')}
          label={{
            bg: 'dark',
            textColor: 'white',
            value: get(n, 'schedule.friendlyScheduleText'),
          }}
        />
      ))}
    </div>
  );
};

export default GroupListConnected;
