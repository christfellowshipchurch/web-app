import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import styled from 'styled-components/macro';

import { theme, baseUnit } from 'styles/theme';

import { Icon, Loader } from 'ui';

import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import GET_GROUP from '../NewGroupContentItemConnected/getGroup';
import { REMOVE_GROUP_RESOURCE } from './mutations';

// :: Styled Components
// ------------------------

const Container = styled.div`
  cursor: pointer;
  padding: ${baseUnit(1)};
`;

// :: Main Component
// ------------------------

export default function DeleteResource({ groupId, resource, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [deleteResource] = useMutation(REMOVE_GROUP_RESOURCE);

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const doDelete = confirm('Are you sure you want to remove this resource?');

    if (!doDelete) return;

    setLoading(true);

    await deleteResource({
      variables: { groupId, relatedNodeId: resource.id },
      refetchQueries: [
        {
          query: GET_GROUP,
          variables: {
            itemId: groupId,
          },
        },
      ],
    });
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Icon name="times" size={22} fill={theme.font[500]} onClick={handleDelete} />
      )}
    </Container>
  );
}

DeleteResource.propTypes = {
  groupId: PropTypes.string,
  resource: GroupResourceProp,
  onDelete: PropTypes.func,
};
