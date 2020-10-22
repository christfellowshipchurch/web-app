import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get } from 'lodash';

import { baseUnit } from 'styles/theme';

import { Icon } from 'ui';

// :: Styled Components
// ------------------------

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 8rem;
  width: 7rem;
  height: 10rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  background: ${({ theme }) => theme.placeholder.image};

  margin-right: ${baseUnit(2)};

  &:last-child {
    margin-right: 0;
  }
`;

const ImageWrapper = styled.div`
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
`;

const Name = styled.div`
  display: block;
`;

// :: Main Component
// ------------------------

const GroupMember = ({ member }) => {
  if (!member) return null;
  const { nickName, firstName, lastName, photo } = member;
  const name = nickName || `${firstName} ${lastName}`.trim();

  return (
    <Container>
      <Icon name="user" size={96} />
      <ImageWrapper>
        <Image src={get(photo, 'uri')} alt={name} />
      </ImageWrapper>
      <Name>{name}</Name>
    </Container>
  );
};

GroupMember.propTypes = {
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
  member: [],
};

export default GroupMember;
