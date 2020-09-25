import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components/macro';
import moment from 'moment';

import { baseUnit } from 'styles/theme';

import { Icon } from 'ui';

// :: Styled Components
const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  margin-top: ${baseUnit(1)};
  margin-left: ${baseUnit(2)};
  margin-right: ${baseUnit(1)};
  margin-bottom: ${baseUnit(2)};

  /* Last message in a list */
  li:last-child > & {
    margin-bottom: ${baseUnit(3)};
  }
`;

const Body = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: ${baseUnit(1)};
`;

const Name = styled.span`
  color: ${({ theme }) => theme.chat.message.name};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
`;

const Date = styled.span`
  color: ${({ theme }) => theme.chat.message.date};
  font-size: ${({ theme }) => theme.fontSize.xsmall};
  margin-left: ${baseUnit(1)};
`;

const MessageText = styled.span`
  color: ${({ theme }) => theme.chat.message.text};
  font-size: ${({ theme }) => theme.fontSize.small};
  padding-right: ${baseUnit(2)};
`;

const AVATAR_SIZE = 42;
const AvatarContainer = styled.div`
  position: relative;
  min-width: ${AVATAR_SIZE}px;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  margin-top: 0.2rem;
  background-color: ${({ theme }) => theme.body.background};
  border-radius: ${AVATAR_SIZE}px;
  overflow: hidden;
`;

const AvatarImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  background-image: ${({ image }) => `url(${image})}`};
  background-size: cover;
`;

const ActionsButton = styled.button`
  display: none;
  position: absolute;
  top: 8px;
  right: 0;
  padding: 0 ${baseUnit(2)} ${baseUnit(1)};
  border: none;
  background: none;

  /* Selector for when the parent MessageContainer is hovered */
  ${MessageContainer}:hover & {
    display: block;
  }
`;

// :: Main Component
const Message = ({ message, isModerator }) => {
  const theme = useTheme();
  // console.log('[rkd] message:', message);

  const {
    text,
    user: { image, name = 'Unknown Person' },
    created_at,
  } = message;

  return (
    <MessageContainer>
      <AvatarContainer>
        <Icon name="user-circle" fill={theme.font[300]} size={AVATAR_SIZE} />
        {image && <AvatarImage image={image} />}
      </AvatarContainer>
      <Body>
        <div>
          <Name>{name}</Name>
          <Date>{moment(created_at).format('LT')}</Date>
        </div>
        <MessageText>{text}</MessageText>
        {isModerator && (
          <ActionsButton>
            <Icon name="three-dots" fill={theme.font[700]} size={18} />
          </ActionsButton>
        )}
      </Body>
    </MessageContainer>
  );
};

Message.propTypes = {
  isModerator: PropTypes.bool,
  message: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    created_at: PropTypes.instanceOf(Date),
    user: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

Message.defaultProps = {
  isModerator: false,
};

export default Message;
