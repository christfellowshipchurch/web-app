import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { get, isEmpty } from 'lodash';

import { Channel } from 'stream-chat';

import { baseUnit } from 'styles/theme';
import { ChatUtils } from 'stream-chat-client'; // really: 'src/stream-chat-client/'

// UI
import { Icon } from 'ui';

// :: Styled Components
// ------------------------

const DirectMessagesToggleContainer = styled.div`
  position: relative;
  padding: ${baseUnit(1)};
  color: ${({ theme }) => theme.font[800]};
`;

const ToggleLabelText = styled.span`
  position: relative;
`;

const UnreadIndicator = styled.span`
  display: block;
  position: absolute;
  top: 0;
  right: -5px;
  width: 8px;
  height: 8px;
  padding: 0;
  line-height: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.chat.unreadIndicator};
`;

const ToggleIcon = styled(Icon).attrs({
  name: 'angle-down',
  size: 20,
})`
  margin-left: ${baseUnit(1)};
  margin-bottom: 2px;
  float: right;
`;

// :: Sub Components
// ------------------------
const DirectMessageToggle = React.forwardRef(({ children, onClick }, ref) => (
  <DirectMessagesToggleContainer
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <ToggleIcon />
  </DirectMessagesToggleContainer>
));

DirectMessageToggle.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

DirectMessageToggle.defaultProps = {
  children: {},
  onClick: () => {},
};

// :: Main Component
// ------------------------

const DirectMessagesDropdown = ({
  currentUserId,
  channels,
  selectedChannel,
  onSelect,
}) => {
  const id = 'dm-selector';

  if (isEmpty(channels)) {
    return null;
  }

  // Shortcut utilities
  const getOtherUserName = (channel) =>
    get(ChatUtils.getOtherUser(channel, currentUserId), 'user.name', 'Unknown Person');

  const channelHasUnread = (channel) =>
    ChatUtils.getChannelUnreadCount(channel, currentUserId) >= 1;

  const handleDropdownSelect = (key, e) => {
    e.preventDefault();
    const index = parseInt(key, 10);
    onSelect(channels[index]);
  };

  const hasUnread = !!channels.find((channel) =>
    ChatUtils.getChannelUnreadCount(channel, currentUserId)
  );

  const toggleLabel = selectedChannel
    ? getOtherUserName(selectedChannel)
    : 'Direct Messages';

  return (
    <Dropdown id={id} onSelect={handleDropdownSelect}>
      <Dropdown.Toggle variant="link" id={id} as={DirectMessageToggle}>
        <ToggleLabelText>
          {toggleLabel}
          {hasUnread && !selectedChannel && <UnreadIndicator />}
        </ToggleLabelText>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {channels.map((channel, i) => (
          <Dropdown.Item
            key={`DmSelector:${i}`}
            eventKey={i}
            active={selectedChannel ? channel.id === selectedChannel.id : false}
          >
            <ToggleLabelText>
              {getOtherUserName(channel)}
              {channelHasUnread(channel) && <UnreadIndicator />}
            </ToggleLabelText>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

DirectMessagesDropdown.propTypes = {
  currentUserId: PropTypes.string,
  channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)),
  selectedChannel: PropTypes.instanceOf(Channel),
  onSelect: PropTypes.func,
};

DirectMessagesDropdown.defaultProps = {
  selectedChannel: null,
};

export default DirectMessagesDropdown;
