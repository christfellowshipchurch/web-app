import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import moment from 'moment';

import { baseUnit } from 'styles/theme';

import { Channel } from 'stream-chat-react';
import { ChatRoles, ChatUtils } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

import { Icon } from 'ui';

import MessageActionsDropdown from './MessageActionsDropdown';
import getMessageActionOptions from './getMessageActionOptions';

// :: Styled Components
// ------------------------

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
  padding-right: ${baseUnit(3)};
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

const AvatarIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'user-circle',
  fill: theme.font[300],
  size: AVATAR_SIZE,
}))``;

// :: Main Component
// ------------------------

const Message = (props) => {
  // State
  const [hovered, setHovered] = useState(false);

  // Props
  const { channel, message } = props;
  const {
    text,
    user: { image, name = 'Unknown Person' },
    created_at: createdAt,
    deleted_at: deletedAt,
  } = message;

  // Don't render deleted messages at all
  if (deletedAt) {
    return null;
  }

  const userRole = ChatUtils.getRoleFromMembership(channel);
  const canPerformActions = userRole !== ChatRoles.GUEST;
  const hoverEventListeners = canPerformActions
    ? {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }
    : {};

  return (
    <MessageContainer {...hoverEventListeners}>
      <AvatarContainer>
        <AvatarIcon />
        {image && <AvatarImage image={image} />}
      </AvatarContainer>
      <Body>
        <div>
          <Name>{name}</Name>
          <Date>{moment(createdAt).format('LT')}</Date>
        </div>
        <MessageText>{text}</MessageText>
        {canPerformActions && hovered && (
          <MessageActionsDropdown
            options={getMessageActionOptions({ ...props, userRole })}
          />
        )}
      </Body>
    </MessageContainer>
  );
};

Message.propTypes = {
  channel: Channel.type.propTypes.channel.isRequired,
  message: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    created_at: PropTypes.instanceOf(Date),
    deleted_at: PropTypes.instanceOf(Date),
    user: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  isMyMessage: PropTypes.func,
  handleDelete: PropTypes.func,
  handleFlag: PropTypes.func,
  onInitiateDm: PropTypes.func,
};

Message.defaultProps = {};

export default Message;
