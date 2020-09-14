import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components/macro';

import { baseUnit } from 'styles/config';

import { Icon } from 'ui';

// :: Styled Components
const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  background: ${({ theme }) => theme.card.background};
  border-radius: ${baseUnit(2)};
  padding: ${baseUnit(1)};
  margin: ${baseUnit(1)} ${baseUnit(2)};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${baseUnit(1)};
`;

const AVATAR_SIZE = 46;
const AvatarContainer = styled.div`
  margin-top: 0.2rem;
  background-color: ${({ theme }) => theme.body.background};
  border-radius: ${AVATAR_SIZE}px;
  overflow: hidden;
`;

const AvatarImage = styled.div`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  background-image: ${({ image }) => `url(${image})}`};
  background-size: cover;
`;

// :: Main Component
const Message = ({ message }) => {
  const theme = useTheme();

  const {
    text,
    user: { image, name = 'Unknown User' },
  } = message;

  return (
    <MessageContainer>
      <AvatarContainer>
        {image ? (
          <AvatarImage image={image} />
        ) : (
          <Icon name="user-circle" fill={theme.font[400]} size={AVATAR_SIZE} />
        )}
      </AvatarContainer>
      <Body>
        <b>{name}</b>
        <span>{text}</span>
      </Body>
    </MessageContainer>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

export default Message;
