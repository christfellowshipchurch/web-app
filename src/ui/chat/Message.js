import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

import { Icon } from 'ui';

// :: Styled Components
const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  border-radius: ${baseUnit(2)};
  margin: ${baseUnit(1)};
  margin-bottom: ${baseUnit(2)};

  /* Last message in a list */
  li:last-child > & {
    margin-bottom: ${baseUnit(3)};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${baseUnit(1)};
`;

const Name = styled.span`
  color: ${({ theme }) => theme.chat.message.name};
  font-weight: bold;
`;

const MessageText = styled.span`
  color: ${({ theme }) => theme.chat.message.text};
`;

const AVATAR_SIZE = 46;
const AvatarContainer = styled.div`
  min-width: ${AVATAR_SIZE}px;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
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
        <Name>{name}</Name>
        <MessageText>{text}</MessageText>
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
