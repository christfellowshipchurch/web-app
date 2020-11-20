import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from 'react-apollo';
import { get } from 'lodash';
import { Button, Dropdown, Loader, TextInput } from '../../ui';
import {
  UPDATE_GROUP_RESOURCE_URL,
  UPDATE_GROUP_RESOURCE_CONTENT_ITEM,
} from '../mutations';
import { GroupResourceProp } from './GroupResources';
import GET_GROUP_RESOURCE_OPTIONS from './getGroupResourceOptions';

export const EditResourceUrl = ({ groupId, resource = {}, refetchData, onCancel }) => {
  const [title, setTitle] = useState(resource.title);
  const [url, setUrl] = useState(resource.url);
  const [updateResource] = useMutation(UPDATE_GROUP_RESOURCE_URL);
  const [loading, setLoading] = useState(false);

  const submitUpdateResource = useCallback(
    async (data) => {
      setLoading(true);
      await updateResource({
        variables: {
          ...data,
          id: resource.resourceId,
          groupId,
        },
      });

      await refetchData();
      setLoading(false);
      setTitle('');
      setUrl('');
    },
    [groupId, resource.resourceId]
  );

  if (loading) return <Loader />;

  return (
    <div>
      <TextInput
        icon={null}
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextInput
        icon={null}
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div
        className="my-3"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            submitUpdateResource({ title, url });
          }}
          className="mr-3 btn-sm"
          title="Save"
        />
        <div
          className="btn-link"
          onClick={() => {
            setTitle('');
            setUrl('');
            onCancel();
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export const EditResourceContentItem = ({
  groupId,
  resource = {},
  refetchData,
  onCancel,
}) => {
  const { data: resourceOptions, loading: dataLoading } = useQuery(
    GET_GROUP_RESOURCE_OPTIONS
  );
  const [contentItemId, setContentItemId] = useState(resource.contentItemId);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateResource] = useMutation(UPDATE_GROUP_RESOURCE_CONTENT_ITEM);

  const submitUpdateResource = useCallback(
    async (data) => {
      setUpdateLoading(true);
      await updateResource({
        variables: {
          ...data,
          id: resource.resourceId,
          groupId,
        },
      });

      await refetchData();
      setUpdateLoading(false);
      setContentItemId('');
    },
    [groupId, resource.resourceId]
  );

  if (dataLoading || updateLoading) return <Loader />;

  return (
    <div>
      <Dropdown
        hideIcon
        label="Content Item"
        value={contentItemId || undefined}
        options={[
          ...get(resourceOptions, 'groupResourceOptions', []),
          ...get(resourceOptions, 'groupResourceOptions', []),
        ].map((option) => ({
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
        <Button
          onClick={() => {
            submitUpdateResource({ contentItemId });
          }}
          className="mr-3 btn-sm"
          title="Save"
        />
        <div
          className="btn-link"
          onClick={() => {
            setContentItemId('');
            onCancel();
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

const propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
  onCancel: PropTypes.func,
};

EditResourceUrl.propTypes = propTypes;
EditResourceContentItem.propTypes = propTypes;
