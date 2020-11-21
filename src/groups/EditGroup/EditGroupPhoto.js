import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { useMutation, useQuery } from 'react-apollo';
import { Icon, Loader } from '../../ui';
import GroupImage from '../NewGroupContentItemConnected/GroupImage';
import { theme } from '../../styles/theme';
import EditGroupItem from './EditGroupItem';
import { GROUP_COVER_IMAGES } from './queries';
import { UPDATE_GROUP_COVER_IMAGE } from './mutations';

const CoverImage = styled.div`
  cursor: pointer;
  flex: 0 0 50%;
`;

const CoverImagesGrid = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
`;

export const EditGroupPhoto = ({ groupId, refetchData, coverImage }) => {
  const { data } = useQuery(GROUP_COVER_IMAGES);

  const [coverImageSelecting, setCoverImageSelecting] = useState(false);
  const [coverImageUpdating, setCoverImageUpdating] = useState(false);
  const [updateCoverImage] = useMutation(UPDATE_GROUP_COVER_IMAGE);

  return coverImageSelecting ? (
    <EditGroupItem
      title="Photo"
      action={() => setCoverImageSelecting(false)}
      actionLabel="Cancel"
    >
      {coverImageUpdating ? (
        <Loader />
      ) : (
        <>
          <span>Select an image</span>
          <CoverImagesGrid>
            {data?.groupCoverImages.map(({ name, image, guid }) => (
              <CoverImage
                className="p-2"
                onClick={async () => {
                  setCoverImageUpdating(true);
                  await updateCoverImage({
                    variables: { imageId: guid, groupId },
                  });
                  await refetchData();
                  setCoverImageUpdating(false);
                  setCoverImageSelecting(false);
                }}
              >
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  key={`group-cover-image-${guid}`}
                  src={image?.sources[0].uri}
                  alt="Group Cover"
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: theme.fontSize.medium }}>{name}</span>
                  {image?.sources[0].uri === coverImage.sources[0].uri ? (
                    <Icon
                      className="d-flex"
                      name="check-circle"
                      fill={theme.brand}
                      size={14}
                    />
                  ) : null}
                </div>
              </CoverImage>
            )) || []}
          </CoverImagesGrid>
        </>
      )}
    </EditGroupItem>
  ) : (
    <EditGroupItem
      title="Photo"
      action={() => setCoverImageSelecting(true)}
      actionLabel="Update"
    >
      <img
        style={{
          height: '100%',
          width: '100%',
        }}
        src={coverImage?.sources[0].uri}
        alt="Group Cover"
      />
    </EditGroupItem>
  );
};

EditGroupPhoto.propTypes = {
  groupId: PropTypes.string,
  refetchData: PropTypes.func,
  coverImage: GroupImage.propTypes.coverImage,
};
