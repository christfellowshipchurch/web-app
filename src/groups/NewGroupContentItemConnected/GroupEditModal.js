import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit, themeGet } from 'styles/theme';

import { FloatingCard } from 'ui';
import { useMutation, useQuery } from 'react-apollo';
import { UPDATE_GROUP_COVER_IMAGE } from '../mutations';
import { Loader } from '../../ui';
import { theme } from '../../styles/theme';
import GET_GROUP_COVER_IMAGES from './getGroupCoverImages';
import { GroupResourceProp, processResource } from './GroupResources';
import GroupResourceForm from './GroupResourceForm';
import GroupImage from './GroupImage';
import GroupEditItem from './GroupEditItem';

// :: Styled Components
// ------------------------

const Title = styled.h2`
  color: ${themeGet('font.h2')};
  margin-bottom: ${baseUnit(3)};
`;

const CoverImagesGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
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

const EditableResource = ({ resource, groupId, refetchData }) => {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <GroupResourceForm groupId={groupId} resource={resource} refetchData={refetchData} />
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
  refetchData: PropTypes.func,
};

const GroupEditModal = ({
  visible,
  resources,
  coverImage,
  groupId,
  onPressExit,
  refetchData,
}) => {
  const { data } = useQuery(GET_GROUP_COVER_IMAGES, {
    skip: !visible,
    fetchPolicy: 'network-only',
  });

  const [coverImageUpdating, setCoverImageUpdating] = useState(false);
  const [updateCoverImage] = useMutation(UPDATE_GROUP_COVER_IMAGE);

  if (!visible) return null;

  const processedResources = resources.map(processResource);

  return (
    <FloatingCard bodyClassNames={'pl-4 pt-0 pb-4 pr-4'} onPressExit={onPressExit}>
      <Title>Customize My Group</Title>
      <GroupEditItem title="Cover Image">
        <CoverImagesGrid>
          {coverImageUpdating ? (
            <Loader />
          ) : (
            data?.groupCoverImages?.map(({ image, guid }) => (
              <div
                style={{
                  flex: '0 0 50%',
                  cursor: 'pointer',
                  padding: 2,
                }}
                onClick={async () => {
                  setCoverImageUpdating(true);
                  await updateCoverImage({
                    variables: { imageId: guid, groupId },
                  });
                  await refetchData();
                  setCoverImageUpdating(false);
                }}
              >
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                    border:
                      image.sources[0].uri === coverImage.sources[0].uri
                        ? `3px solid ${theme.brand}`
                        : 'none',
                  }}
                  key={`group-cover-image-${guid}`}
                  src={image?.sources[0].uri}
                  alt="Group Cover"
                />
              </div>
            )) || []
          )}
        </CoverImagesGrid>
      </GroupEditItem>
      <GroupEditItem title="Resources">
        {processedResources.map((resource, index) => (
          <EditableResource
            key={resource?.url || `resource-${index}`}
            resource={resource}
            groupId={groupId}
            refetchData={refetchData}
          />
        ))}
        <EditableResource groupId={groupId} refetchData={refetchData} />
      </GroupEditItem>
    </FloatingCard>
  );
};

GroupEditModal.propTypes = {
  visible: PropTypes.bool,
  resources: PropTypes.arrayOf(GroupResourceProp),
  onPressExit: PropTypes.func,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
  coverImage: GroupImage.propTypes.coverImage,
};

export default GroupEditModal;
