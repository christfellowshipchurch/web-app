import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { Button, TextInput } from '../../ui';
import { UPDATE_GROUP_RESOURCE } from '../mutations';
import { GroupResourceProp } from './GroupResources';

export default function GroupResourceForm({
  groupId,
  resource = {},
  refetchData,
  onCancel,
  setLoading,
}) {
  const [title, setTitle] = useState(resource.title);
  const [url, setURL] = useState(resource.url);
  const [updateResource] = useMutation(UPDATE_GROUP_RESOURCE);

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
    },
    [groupId, resource.resourceId]
  );

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
        onChange={(e) => setURL(e.target.value)}
      />
      <div
        className="my-3"
        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
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
            setURL('');
            onCancel();
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

GroupResourceForm.propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
  onCancel: PropTypes.func,
  setLoading: PropTypes.func,
};
