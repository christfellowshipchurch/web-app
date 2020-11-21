import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { theme } from 'styles/theme';
import { Icon } from '../../ui';
import GET_GROUP from '../NewGroupContentItemConnected/getGroup';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import { REMOVE_GROUP_RESOURCE } from './mutations';

export default function DeleteResource({ groupId, resource }) {
  const [deleteResource] = useMutation(REMOVE_GROUP_RESOURCE);

  return (
    <Icon
      name="times"
      size={30}
      fill={theme.font.destructive}
      onClick={async () => {
        await deleteResource({
          variables: { groupId, id: resource.resourceId },
          optimisticResponse: {
            __typename: 'Mutation',
            removeGroupResource: {
              __typename: 'Resource',
              id: resource.resourceId,
            },
          },
          update: (proxy) => {
            const data = proxy.readQuery({
              query: GET_GROUP,
              variables: { itemId: groupId },
            });
            proxy.writeQuery({
              query: GET_GROUP,
              data: {
                ...data,
                node: {
                  ...data.node,
                  resources: data.node.resources.filter(
                    (r) => r.id !== resource.resourceId
                  ),
                },
              },
            });
          },
        });
      }}
    />
  );
}

DeleteResource.propTypes = {
  groupId: PropTypes.string,
  resource: GroupResourceProp,
};
