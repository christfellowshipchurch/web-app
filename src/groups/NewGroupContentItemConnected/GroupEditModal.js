import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit, themeGet } from 'styles/theme';

import { FloatingCard } from 'ui';
import { useMutation, useQuery } from 'react-apollo';
import { UPDATE_GROUP_COVER_IMAGE } from '../mutations';
import { Button } from '../../ui';
import GET_GROUP_COVER_IMAGES from './getGroupCoverImages';
import { GroupResourceProp, processResource, ResourcesHeading } from './GroupResources';
import GroupResourceForm from './GroupResourceForm';

// :: Styled Components
// ------------------------

const Title = styled.h2`
  color: ${themeGet('font.h2')};
  margin-bottom: ${baseUnit(3)};
`;

const ResourceDetails = styled.div`
  display: flex;
  width: 100%;
  font-size: ${themeGet('fontSize.medium')};
  cursor: pointer;
`;

const ResourceUrl = styled.div`
  font-size: ${themeGet('fontSize.xsmall')};
`;

const VerticalScrollBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  max-height: 600px;
  overflow-y: scroll;
`;

const EditableResource = ({ resource, groupId }) => {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <GroupResourceForm groupId={groupId} resource={resource} />
  ) : (
    <ResourceDetails onClick={() => setEditing(true)}>
      {resource?.title || '+ Add new resource'}
      {resource?.url ? <ResourceUrl>{resource.url}</ResourceUrl> : null}
    </ResourceDetails>
  );
};

EditableResource.propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
};

const GroupEditModal = ({ visible, resources, groupId, onPressExit, refetchData }) => {
  const { data } = useQuery(GET_GROUP_COVER_IMAGES, {
    skip: !visible,
    fetchPolicy: 'network-only',
  });

  const [updateCoverImage] = useMutation(UPDATE_GROUP_COVER_IMAGE);

  if (!visible) return null;

  const processedResources = resources.map(processResource);

  return (
    <FloatingCard bodyClassNames={'pl-4 pt-0 pb-4 pr-0'} onPressExit={onPressExit}>
      <Title>Customize My Group</Title>
      {data?.getGroupCoverImages?.map(({ image, guid }) => (
        <img
          style={{ width: 200 }}
          key={`group-cover-image-${guid}`}
          src={image?.sources[0].uri}
          alt="Group Cover"
          onClick={async () => {
            await updateCoverImage({
              variables: { imageId: guid, groupId },
            });
            refetchData();
          }}
        />
      ))}
      <VerticalScrollBox className="pb-3">
        <ResourcesHeading>Resources</ResourcesHeading>
        {processedResources.map((resource, index) => (
          <EditableResource
            key={resource?.url || `resource-${index}`}
            resource={resource}
            groupId={groupId}
          />
        ))}
        <EditableResource groupId={groupId} />
      </VerticalScrollBox>
    </FloatingCard>
  );
};

GroupEditModal.propTypes = {
  visible: PropTypes.bool,
  resources: PropTypes.arrayOf(GroupResourceProp),
  onPressExit: PropTypes.func,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
};

export default GroupEditModal;
