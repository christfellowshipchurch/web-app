import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import styled from 'styled-components';
import { Button, Card, Col, Loader, Row, TextInput } from '../../ui';
import { UPDATE_GROUP_RESOURCE } from '../mutations';
import { GroupResourceProp } from './GroupResources';

const EditResourceFormHeader = styled.h5`
  text-align: center;
`;

export default function GroupResourceForm({ groupId, resource = {}, refetchData }) {
  const [title, setTitle] = useState(resource.title);
  const [url, setURL] = useState(resource.url);
  const [loading, setLoading] = useState(false);
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

  return loading ? (
    <Loader />
  ) : (
    <Card>
      <Col>
        <EditResourceFormHeader>
          {resource.title || 'Add Resource'}
        </EditResourceFormHeader>
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
        <Row>
          <Col>
            <Button
              loading={loading}
              onClick={() => {
                if (!loading) {
                  submitUpdateResource({ title, url });
                }
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <div
              className="btn-link"
              onClick={() => {
                setTitle('');
                setURL('');
              }}
            >
              Cancel
            </div>
          </Col>
        </Row>
      </Col>
    </Card>
  );
}

GroupResourceForm.propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
};
