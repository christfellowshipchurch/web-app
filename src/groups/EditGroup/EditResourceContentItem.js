import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import { get, isEmpty } from 'lodash';
import { Button, Dropdown, Loader } from '../../ui';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import GET_GROUP from '../NewGroupContentItemConnected/getGroup';
import { UPDATE_GROUP_RESOURCE_CONTENT_ITEM } from './mutations';
import { GROUP_RESOURCE_OPTIONS } from './queries';

export default function EditResourceContentItem({
  groupId,
  resource = {},
  refetchData,
  onCancel,
}) {
  const { data, loading: dataLoading } = useQuery(GROUP_RESOURCE_OPTIONS, {
    variables: { groupId },
  });
  const [contentItemId, setContentItemId] = useState(resource.id);
  const [updateResource] = useMutation(UPDATE_GROUP_RESOURCE_CONTENT_ITEM);

  const resourceOptions = get(data, 'groupResourceOptions.edges', []).map((edge) =>
    get(edge, 'node', {})
  );

  const submitUpdateResource = useCallback(
    async (data) => {
      await updateResource({
        variables: {
          ...data,
          id: resource.resourceId,
          groupId,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateGroupResourceContentItem: {
            __typename: 'Resource',
            id: resource.resourceId,
          },
        },
        update: (proxy) => {
          const cacheData = proxy.readQuery({
            query: GET_GROUP,
            variables: { itemId: groupId },
          });
          proxy.writeQuery({
            query: GET_GROUP,
            data: {
              ...cacheData,
              node: {
                ...cacheData.node,
                resources: cacheData.node.resources.map((r) => {
                  if (r.id === resource.resourceId) {
                    const resourceOption = resourceOptions.find(
                      (ro) => ro.id === data.contentItemId
                    );
                    return {
                      ...r,
                      title: resourceOption.title,
                      relatedNode: {
                        ...r.relatedNode,
                        id: resourceOption.id,
                      },
                    };
                  }
                  return r;
                }),
              },
            },
          });
        },
      });
      onCancel();
    },
    [groupId, resource.resourceId]
  );

  if (dataLoading) return <Loader />;

  return (
    <div>
      <Dropdown
        hideIcon
        label="Study"
        value={contentItemId}
        options={[{ title: '', id: '' }, ...resourceOptions].map((option) => ({
          label: option.title,
          value: option.id,
        }))}
        onChange={(e) => setContentItemId(e.target.value)}
      />
      <div
        className="my-3"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {isEmpty(contentItemId) ? null : (
          <Button
            disabled={true}
            onClick={() => {
              submitUpdateResource({ contentItemId });
            }}
            className="mr-3 btn-sm"
            title="Save"
          />
        )}
        <div
          className="btn-link"
          onClick={() => {
            setContentItemId('');
            onCancel();
          }}
        >
          Back
        </div>
      </div>
    </div>
  );
}

EditResourceContentItem.propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
  onCancel: PropTypes.func,
};
