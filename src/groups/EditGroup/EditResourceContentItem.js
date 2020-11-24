import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import { get, isEmpty } from 'lodash';
import { Button, Dropdown, Loader } from '../../ui';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import GET_GROUP from '../NewGroupContentItemConnected/getGroup';
import { theme } from '../../styles/theme';
import { UPDATE_GROUP_RESOURCE_CONTENT_ITEM } from './mutations';
import { GROUP_RESOURCE_OPTIONS } from './queries';

export default function EditResourceContentItem({
  groupId,
  resource = {},
  resources = [],
  onCancel,
}) {
  const { data, loading: dataLoading } = useQuery(GROUP_RESOURCE_OPTIONS, {
    variables: { groupId },
    fetchPolicy: 'network-only',
  });
  const [contentItemId, setContentItemId] = useState(resource.id);
  const [updateResource] = useMutation(UPDATE_GROUP_RESOURCE_CONTENT_ITEM);
  const [updateLoading, setUpdateLoading] = useState(false);

  const isValid = !resources.find((r) => r.id === contentItemId);
  const unchanged = contentItemId === resource.id;

  const resourceOptions = get(data, 'groupResourceOptions.edges', []).map((edge) =>
    get(edge, 'node', {})
  );

  useEffect(() => {
    if (resource.id) {
      setUpdateLoading(false);
    }
  }, [resource]);

  const submitUpdateResource = useCallback(
    async (data) => {
      setUpdateLoading(true);
      await updateResource({
        variables: {
          ...data,
          relatedNodeId: resource.id,
          groupId,
        },
        refetchQueries: [
          {
            query: GET_GROUP,
            variables: {
              itemId: groupId,
            },
          },
        ],
      });
    },
    [groupId, resource.id, updateResource]
  );

  if (dataLoading || updateLoading) return <Loader />;

  return (
    <div>
      {!isValid && !unchanged && (
        <span style={{ color: theme.font.destructive }}>
          This resource already exists!
        </span>
      )}
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
        {isValid && !isEmpty(contentItemId) && (
          <Button
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
  resources: PropTypes.arrayOf(GroupResourceProp),
  groupId: PropTypes.string,
  onCancel: PropTypes.func,
};
