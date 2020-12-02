import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components/macro';
import { get } from 'lodash';

import { themeGet } from 'styles/theme';

import { Icon } from 'ui';

const ImageStatuses = Object.freeze({
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
});

// :: Styled Components
// ------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const loadingAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0.5;
  }
`;

const ImageOuter = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 125%;
  border-radius: ${themeGet('borderRadius.large')};
  overflow: hidden;
  background: ${({ bg, theme }) => bg || theme.placeholder.image};
  animation: ${({ status, index }) =>
    status === ImageStatuses.LOADING
      ? css`
          ${loadingAnimation} 1s alternate ${index * 0.2}s infinite
        `
      : 'none'};
`;

const UserIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'user',
  size: 48,
  fill: theme.font[200],
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.4s ease-out;
`;

const Name = styled.div`
  display: block;
  margin-top: 0.5rem;
  text-align: center;
  font-size: ${themeGet('fontSize.small')};
  font-weight: ${themeGet('fontWeight.medium')};
  color: ${themeGet('font[700]')};
`;

const SeeAllPlus = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: ${themeGet('fontSize.h5')};
  color: ${themeGet('font.300')};
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    color: ${themeGet('brand')};
  }
`;

// :: Sub Component
// ------------------------

export const SeeAllTile = ({ hiddenCount, onClick }) => {
  return (
    <Container>
      <ImageOuter bg="transparent">
        <ImageInner>
          <SeeAllPlus onClick={onClick}>+{hiddenCount}</SeeAllPlus>
        </ImageInner>
      </ImageOuter>
    </Container>
  );
};

SeeAllTile.propTypes = {
  hiddenCount: PropTypes.number,
  onClick: PropTypes.func,
};

SeeAllTile.defaultProps = {};

// :: Main Component
// ------------------------

const GroupMember = ({ index, member }) => {
  const { nickName, firstName, lastName, photo } = member;
  const imageSrc = get(photo, 'uri');
  const name = nickName || `${firstName} ${lastName}`.trim();

  const [status, setStatus] = useState(
    imageSrc ? ImageStatuses.LOADING : ImageStatuses.LOADED
  );

  if (!member) return null;

  const handleLoaded = () => setStatus(ImageStatuses.LOADED);
  const handleError = () => setStatus(ImageStatuses.ERROR);

  return (
    <Container>
      <ImageOuter status={status} index={index}>
        <UserIcon />
        {status !== ImageStatuses.ERROR && (
          <ImageInner>
            <Image
              src={imageSrc}
              alt={name}
              loaded={status === ImageStatuses.LOADED}
              onLoad={handleLoaded}
              onError={handleError}
            />
          </ImageInner>
        )}
      </ImageOuter>
      <Name>{name}</Name>
    </Container>
  );
};

GroupMember.propTypes = {
  index: PropTypes.number,
  member: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    nickName: PropTypes.string,
    photo: PropTypes.shape({
      uri: PropTypes.string,
    }),
  }),
};

GroupMember.defaultProps = {
  index: 0,
  member: [],
};

GroupMember.SeeAllTile = SeeAllTile;

export default GroupMember;
