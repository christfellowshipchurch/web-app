import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get, isEmpty } from 'lodash';

import { Channel } from 'stream-chat';

import { baseUnit } from 'styles/theme';

// UI
import { Icon } from 'ui';

const getOtherUser = (currentUserId, channel) => {
  const otherUser = Object.values(channel.state.members).find(
    (member) => member.user.id !== currentUserId
  );

  return get(otherUser, 'user.name', 'Unknown User');
};

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

const DirectMessagesSelect = styled.select`
  padding: ${baseUnit(1)};
`;

// :: Main Component
// ------------------------

const DirectMessagesDropdown = ({
  currentUserId,
  channels,
  selectedChannelId,
  onSelect,
}) => {
  // Hide the dropdown if there are no channels OR there is only one
  // channel, and we're currently viewing it (small assumption)
  if (isEmpty(channels) || (channels.length === 1 && selectedChannelId)) {
    return null;
  }

  // When there's only 1 active DM channel
  if (channels.length === 1) {
    return (
      <HeaderButton onClick={() => onSelect(channels[0])}>
        <span>DM with {getOtherUser(currentUserId, channels[0])}</span>
        <HeaderIcon name="angle-right" />
      </HeaderButton>
    );
  }

  // When there is more than one active DM channel
  const handleValueChange = (event) => {
    const value = event.target.value;
    const selectedChannel = channels.find((channel) => channel.id === value);
    onSelect(selectedChannel);
  };

  return (
    <DirectMessagesSelect value={selectedChannelId} onChange={handleValueChange}>
      <option value="" disabled>
        Direct Messages...
      </option>
      {channels.map((channel) => (
        <option key={channel.id} value={channel.id}>
          {getOtherUser(currentUserId, channel)}
        </option>
      ))}
    </DirectMessagesSelect>
  );
};

DirectMessagesDropdown.propTypes = {
  currentUserId: PropTypes.string,
  channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)),
  selectedChannelId: PropTypes.string,
  onSelect: PropTypes.func,
};

DirectMessagesDropdown.defaultProps = {
  selectedChannelId: '',
};

export default DirectMessagesDropdown;
