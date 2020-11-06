import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components/macro';
import { get } from 'lodash';

import { baseUnit, themeGet } from 'styles/theme';

import { Icon } from 'ui';

// :: Styled Components
// ------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${baseUnit(2)};
  margin-right: ${baseUnit(2)};

  &:last-child {
    margin-right: 0;
  }
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
  min-width: 5rem;
  width: 5rem;
  height: 6rem;
  border-radius: ${themeGet('borderRadius.large')};
  background: ${themeGet('placeholder.image')};
  overflow: hidden;
  animation: ${({ status, index }) =>
    status === 'loading'
      ? css`
          ${loadingAnimation} 1s alternate ${index * 0.2}s infinite
        `
      : 'none'};
`;

const UserIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'user',
  size: 72,
  fill: theme.font[200],
}))``;

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
  margin-top: 0.2rem;
  text-align: center;
  font-size: ${themeGet('fontSize.small')};
  font-weight: ${themeGet('fontWeight.medium')};
  color: ${themeGet('font[700]')};
`;

// :: Main Component
// ------------------------

const GroupMember = ({ index, member }) => {
  const { nickName, firstName, lastName, photo } = member;
  const imageSrc = get(photo, 'uri');
  const name = nickName || `${firstName} ${lastName}`.trim();

  const [status, setStatus] = useState(imageSrc ? 'loading' : 'loaded');

  if (!member) return null;

  const handleLoaded = () => setStatus('loaded');
  const handleError = () => setStatus('error');

  return (
    <Container>
      <ImageOuter status={status} index={index}>
        <UserIcon />
        {status !== 'error' && (
          <ImageInner>
            <Image
              src={imageSrc}
              alt={name}
              loaded={status === 'loaded'}
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

export default GroupMember;
