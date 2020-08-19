import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { ContentCard, ErrorBlock, Loader } from '../../ui';

import GET_CURRENT_USER_GROUPS from './getCurrentUserGroups';

const GroupCollection = ({ title, groups }) => [
  <div key={`GroupCollectionTitle:${title}`} className="row pt-2">
    <div className="col">
      <h1 className="mb-0">{title}</h1>
    </div>
  </div>,
  <div key={`GroupCollection:${title}`} className="row mx-n2">
    {groups.map(
      (n) => console.log(get(n, 'coverImage.sources', '')) || (
      <ContentCard
        key={n.id}
        urlBase="groups"
        className="my-4"
        imageUrl={get(n, 'coverImage.sources[0].uri', '')}
        title={get(n, 'title', '')}
      />
      ),
    )}
  </div>,
];

GroupCollection.propTypes = {
  title: PropTypes.string,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      nextOccurrence: PropTypes.string,
    }),
  ),
};

GroupCollection.defaultProps = {
  groups: [],
};

const GroupListConnected = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER_GROUPS, {
    fetchPolicy: 'cache-and-network',
  });

  console.log(data);
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

  const currentUsersGroups = get(data, 'currentUser.profile.groups', []);

  return (
    <div className="container-fluid my-6 px-4">
      <GroupCollection title="Groups" groups={currentUsersGroups} />
    </div>
  );
};

export default GroupListConnected;
