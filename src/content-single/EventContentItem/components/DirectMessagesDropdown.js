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

const HeaderButton = styled.button`
  padding: ${baseUnit(1)};
  border: none;
  background: none;
  color: ${({ theme }) => theme.link};
`;

const HeaderIcon = styled(Icon).attrs(({ theme, name }) => ({
  name,
  fill: theme.brand,
  size: 22,
}))``;

const DirectMessagesToggleContainer = styled.div`
  padding: ${baseUnit(1)};
  color: ${({ theme }) => theme.font[800]};
`;

const ToggleIcon = styled(Icon).attrs({
  name: 'angle-down',
  size: 18,
})`
  margin-left: ${baseUnit(1)};
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
  const getOtherUserName = (channel) =>
    get(ChatUtils.getOtherUser(channel, currentUserId), 'user.name', 'Unknown Person');

  // Hide the dropdown if there are no channels OR there is only one
  // channel, and we're currently viewing it.
  // Note: Logic assumes selectedChannel value matches channels[0].cid
  if (isEmpty(channels) || (channels.length === 1 && selectedChannel)) {
    return null;
  }

  // When there's only 1 active DM channel
  if (channels.length === 1) {
    return (
      <HeaderButton onClick={() => onSelect(channels[0])}>
        <span>{getOtherUserName(channels[0])}</span>
        <HeaderIcon name="angle-right" />
      </HeaderButton>
    );
  }

  const handleDropdownSelect = (key, e) => {
    e.preventDefault();
    const index = parseInt(key, 10);
    onSelect(channels[index]);
  };

  const hasUnreads = !!channels.find((channel) =>
    ChatUtils.getChannelUnreadCount(channel, currentUserId)
  );
  console.log('[rkd] hasUnreads:', hasUnreads);

  const toggleLabel = selectedChannel
    ? getOtherUserName(selectedChannel)
    : 'Direct Messages';

  return (
    <Dropdown id={id} onSelect={handleDropdownSelect}>
      <Dropdown.Toggle variant="link" id={id} as={DirectMessageToggle}>
        {toggleLabel}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {channels.map((channel, i) => (
          <Dropdown.Item
            key={`DmSelector:${i}`}
            eventKey={i}
            active={selectedChannel ? channel.id === selectedChannel.id : false}
          >
            {getOtherUserName(channel)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  // return (
  //   <DirectMessagesSelect value={selectedChannel} onChange={handleValueChange}>
  //     <option value="" disabled>
  //       {`Direct Messages...${hasUnreads ? ' *' : ''}`}
  //     </option>
  //     {channels.map((channel) => (
  //       <option key={channel.id} value={channel.id}>
  //         {getOtherUser(currentUserId, channel)}
  //         {ChatUtils.getChannelUnreadCount(channel, currentUserId) >= 1 ? ' *' : ''}
  //       </option>
  //     ))}
  //   </DirectMessagesSelect>
  // );
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
