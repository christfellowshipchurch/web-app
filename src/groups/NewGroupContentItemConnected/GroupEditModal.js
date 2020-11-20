import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit, themeGet } from 'styles/theme';

import { FloatingCard } from 'ui';
import { useMutation, useQuery } from 'react-apollo';
import { REMOVE_GROUP_RESOURCE, UPDATE_GROUP_COVER_IMAGE } from '../mutations';
import { Button, Loader } from '../../ui';
import { theme } from '../../styles/theme';
import { Icon } from '../../ui/Icons';
import GET_GROUP_COVER_IMAGES from './getGroupCoverImages';
import { GroupResourceProp, processResource } from './GroupResources';
import { EditResourceContentItem, EditResourceUrl } from './GroupResourceForm';
import GroupImage from './GroupImage';
import GroupEditItem from './GroupEditItem';

// :: Styled Components
// ------------------------

const Title = styled.h2`
  color: ${themeGet('font.h1')};
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: ${themeGet('fontSize.medium')};
  cursor: pointer;
`;

const ResourceUrl = styled.div`
  font-size: ${themeGet('fontSize.xsmall')};
`;

const AddResource = ({ groupId, refetchData }) => {
  const [resourceType, setResourceType] = useState();

  switch (resourceType) {
    case 'url':
      return (
        <EditResourceUrl
          groupId={groupId}
          refetchData={refetchData}
          onCancel={() => setResourceType(null)}
        />
      );
    case 'contentItem':
      return (
        <EditResourceContentItem
          groupId={groupId}
          refetchData={refetchData}
          onCancel={() => setResourceType(null)}
        />
      );
    default:
      return (
        <div style={{ display: 'flex' }}>
          <Button title="URL" onClick={() => setResourceType('url')} />
          <Button title="Content Item" onClick={() => setResourceType('contentItem')} />
        </div>
      );
  }
};

const EditableResourceUrl = ({ resource, groupId, refetchData }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleteResource] = useMutation(REMOVE_GROUP_RESOURCE);

  if (loading) return <Loader />;

  return editing ? (
    <EditResourceContentItem
      groupId={groupId}
      resource={resource}
      refetchData={refetchData}
      onCancel={() => setEditing(false)}
    />
  ) : (
    <ResourceDetails className="mb-2 text-dark">
      <div
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        onClick={() => setEditing(true)}
      >
        {resource?.title}
        <ResourceUrl>{resource.url}</ResourceUrl>
      </div>
      <Icon
        name="times"
        size={30}
        fill={theme.font.destructive}
        onClick={async () => {
          setLoading(true);
          await deleteResource({
            variables: { groupId, id: resource.resourceId },
          });
          await refetchData();
          setLoading(false);
        }}
      />
    </ResourceDetails>
  );
};

EditableResourceUrl.propTypes = {
  resource: GroupResourceProp,
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
};

const EditableResourceContentItem = ({ resource, groupId, refetchData }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleteResource] = useMutation(REMOVE_GROUP_RESOURCE);

  if (loading) return <Loader />;

  return editing ? (
    <EditResourceContentItem
      groupId={groupId}
      resource={resource}
      refetchData={refetchData}
      onCancel={() => setEditing(false)}
    />
  ) : (
    <ResourceDetails className="mb-2 text-dark">
      <div
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        onClick={() => setEditing(true)}
      >
        {resource?.title}
      </div>
      <Icon
        name="times"
        size={30}
        fill={theme.font.destructive}
        onClick={async () => {
          setLoading(true);
          await deleteResource({
            variables: { groupId, id: resource.resourceId },
          });
          await refetchData();
          setLoading(false);
        }}
      />
    </ResourceDetails>
  );
};

EditableResourceContentItem.propTypes = {
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
          <div style={{ position: 'relative', minHeight: 42 }}>
            {resource.action === 'OPEN_URL' ? (
              <EditableResourceUrl
                key={resource?.url || `resource-${index}`}
                resource={resource}
                groupId={groupId}
                refetchData={refetchData}
              />
            ) : (
              <EditableResourceContentItem
                key={resource?.contentItemId || `resource-${index}`}
                resource={resource}
                groupId={groupId}
                refetchData={refetchData}
              />
            )}
          </div>
        ))}
        <AddResource groupId={groupId} refetchData={refetchData} />
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
