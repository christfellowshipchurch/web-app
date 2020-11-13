import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import styled from 'styled-components';
import { themeGet } from 'styles/theme';
import { Button, Card, Col, Row, TextInput } from '../../ui';
import { UPDATE_GROUP_RESOURCE } from '../mutations';
import { GroupResourceProp } from './GroupResources';

const EditResourceFormHeader = styled.h5`
  text-align: center;
`;

export default function GroupResourceForm({ groupId, resource = {} }) {
  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateResource] = useMutation(UPDATE_GROUP_RESOURCE);
  const resourceId = resource.id;

  const submitUpdateResource = useCallback(
    async (data) => {
      setLoading(true);

      const response = await updateResource({
        variables: {
          ...data,
          id: resourceId,
          groupId,
        },
      });

      setTitle('');
      setURL('');
      setLoading(false);
    },
    [groupId, resourceId]
  );

  return (
    <Card>
      <Col>
        <EditResourceFormHeader>
          {resource.title || 'Add Resource'}
        </EditResourceFormHeader>
        <TextInput
          icon=""
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          icon=""
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
};
