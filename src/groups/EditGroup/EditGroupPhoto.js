import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';

import { useMutation, useQuery } from 'react-apollo';
import { Icon, Loader } from 'ui';
import { baseUnit, themeGet } from 'styles/theme';

import GroupImage from 'groups/NewGroupContentItemConnected/GroupImage';
import GET_GROUP from 'groups/NewGroupContentItemConnected/getGroup';

import EditGroupItem from './EditGroupItem';
import { GROUP_COVER_IMAGES } from './queries';
import { UPDATE_GROUP_COVER_IMAGE } from './mutations';

// :: Styled Components
// ------------------------

const CoverImagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${baseUnit(2)};
  margin-top: ${baseUnit(1)};
`;

const touchableScale = ({ onClick }) =>
  onClick
    ? css`
        cursor: pointer;

        &:hover > img {
          transform: scale(1.03);
        }
      `
    : '';

const CoverImageCard = styled.div`
  position: relative;
  border-radius: ${themeGet('borderRadius.medium')};
  overflow: hidden;
  box-shadow: ${({ theme, shadowSize = 'medium' }) => theme.shadow[shadowSize]};

  ${touchableScale}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease-in-out;
`;

const SelectedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: ${baseUnit(1)};
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
`;

const SelectedIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'check-circle',
  fill: theme.brand,
  size: 36,
}))``;

// :: Main Component
// ------------------------

export const EditGroupPhoto = ({ groupId, coverImage }) => {
  const { data } = useQuery(GROUP_COVER_IMAGES);

  const [coverImageSelecting, setCoverImageSelecting] = useState(false);
  const [coverImageUpdating, setCoverImageUpdating] = useState(false);
  const [updateCoverImage] = useMutation(UPDATE_GROUP_COVER_IMAGE);

  const currentImageUri = coverImage.sources[0].uri;

  useEffect(() => {
    setCoverImageUpdating(false);
    setCoverImageSelecting(false);
  }, [coverImage]);

  const handleEnableCoverImageSelecting = () => setCoverImageSelecting(true);

  const handleCoverImageClick = async (guid) => {
    setCoverImageUpdating(true);
    await updateCoverImage({
      variables: { imageId: guid, groupId },
      refetchQueries: [
        {
          query: GET_GROUP,
          variables: {
            itemId: groupId,
          },
        },
      ],
    });
  };

  if (coverImageSelecting) {
    return (
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
              {data?.groupCoverImages.map((imageOption) => {
                const selected = imageOption.image?.sources[0].uri === currentImageUri;
                const onClick = !selected
                  ? () => handleCoverImageClick(imageOption.guid)
                  : null;

                return (
                  <CoverImageCard shadowSize={'small'} onClick={onClick}>
                    <Image
                      key={`group-cover-image-${imageOption.guid}`}
                      src={imageOption.image?.sources[0].uri}
                      alt={imageOption.name}
                    />
                    {selected && (
                      <SelectedOverlay>
                        <SelectedIcon />
                      </SelectedOverlay>
                    )}
                  </CoverImageCard>
                );
              }) || []}
            </CoverImagesGrid>
          </>
        )}
      </EditGroupItem>
    );
  }
  return (
    <EditGroupItem
      title="Photo"
      action={handleEnableCoverImageSelecting}
      actionLabel="Update"
    >
      <CoverImageCard onClick={handleEnableCoverImageSelecting}>
        <Image src={currentImageUri} alt="Group Cover" />
      </CoverImageCard>
    </EditGroupItem>
  );
};

EditGroupPhoto.propTypes = {
  groupId: PropTypes.string,
  coverImage: GroupImage.propTypes.coverImage,
};
