import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { theme } from 'styles/theme';
import { Icon } from '../../ui';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import GET_GROUP from '../NewGroupContentItemConnected/getGroup';
import { REMOVE_GROUP_RESOURCE } from './mutations';

export default function DeleteResource({ groupId, resource, onDelete }) {
  const [deleteResource] = useMutation(REMOVE_GROUP_RESOURCE);

  return (
    <Icon
      name="times"
      size={30}
      fill={theme.font.destructive}
      onClick={async () => {
        onDelete();
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
      }}
    />
  );
}

DeleteResource.propTypes = {
  groupId: PropTypes.string,
  resource: GroupResourceProp,
  onDelete: PropTypes.func,
};
