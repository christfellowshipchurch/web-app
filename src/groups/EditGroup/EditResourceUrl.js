import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { Button, TextInput } from '../../ui';
import { GroupResourceProp } from '../NewGroupContentItemConnected/GroupResources';
import GET_GROUP from '../NewGroupContentItemConnected/getGroup';
import { UPDATE_GROUP_RESOURCE_URL } from './mutations';

export default function EditResourceUrl({ groupId, resource = {}, onCancel }) {
  const [title, setTitle] = useState(resource.title);
  const [url, setUrl] = useState(resource.url);
  const [updateResource] = useMutation(UPDATE_GROUP_RESOURCE_URL);

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
          updateGroupResourceUrl: {
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
                    return {
                      ...r,
                      title: data.title,
                      relatedNode: {
                        ...r.relatedNode,
                        url: data.url,
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
          Back
        </div>
      </div>
    </div>
  );
}

EditResourceUrl.propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
  onCancel: PropTypes.func,
};
