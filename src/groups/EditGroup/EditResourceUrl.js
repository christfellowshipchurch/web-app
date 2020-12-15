import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { Button, Loader, TextInput } from '../../ui';
import { ProcessedResourceProps } from '../NewGroupContentItemConnected/GroupResources';
import { theme } from '../../styles/theme';
import GET_GROUP from '../NewGroupContentItemConnected/getGroup';
import { UPDATE_GROUP_RESOURCE_URL } from './mutations';

export default function EditResourceUrl({
  groupId,
  resource = {},
  onCancel,
  resources = [],
}) {
  const [title, setTitle] = useState(resource.title);
  const [url, setUrl] = useState(resource.url);
  const [updateResource] = useMutation(UPDATE_GROUP_RESOURCE_URL);
  const [loading, setLoading] = useState(false);

  const isValid = !resources.find((r) => r.url === url);
  const unchanged = resource.url === url;

  useEffect(() => {
    if (resource.id) {
      setLoading(false);
    }
  }, [resource]);

  const submitUpdateResource = useCallback(
    async (data) => {
      setLoading(true);
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
      {!isValid && !unchanged && (
        <span style={{ color: theme.font.destructive }}>
          This resource already exists!
        </span>
      )}
      <div
        className="my-3"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {isValid && (
          <Button
            onClick={() => {
              submitUpdateResource({ title, url });
            }}
            className="mr-3 btn-sm"
            title="Save"
          />
        )}
        <div
          className="btn-link"
          onClick={() => {
            setTitle('');
            setUrl('');
            onCancel();
          }}
        >
          Back
        </div>
      </div>
    </div>
  );
}

EditResourceUrl.propTypes = {
  resource: ProcessedResourceProps,
  groupId: PropTypes.string,
  onCancel: PropTypes.func,
  resources: PropTypes.arrayOf(ProcessedResourceProps),
};
