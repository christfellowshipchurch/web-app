import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components/macro';

import { baseUnit } from 'styles/config';

import { Icon } from 'ui/Icons';

import EventChat from './EventChat';

// :: Styled Components
// ------------------------

const EventPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.body.background};
`;

const PanelHeader = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.card.background};
  z-index: 1;
`;

const TabContainer = styled.div`
  display: inline-flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${baseUnit(3)} ${baseUnit(3)} ${baseUnit(2)};
`;

const TabButton = styled.button`
  background: none;
  border: none;
  text-align: center;
  opacity: ${({ active }) => (active ? 1 : 0.7)};
  transition: opacity 0.15s ease-out;

  &:hover {
    opacity: 1;
  }
`;

const TabLabel = styled.span`
  display: block;
  margin-top: ${baseUnit(1)};
  font-weight: bold;
  color: ${({ active, theme }) => (active ? theme.font[900] : theme.card.color)};
`;

const PanelBody = styled.div`
  position: relative;
  box-sizing: border-box;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

const TabContent = styled.div`
  ${({ active }) => !active && 'display: none;'}
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
`;

// ---
const Tab = withTheme(({ theme, label, iconName, active, onPress }) => (
  <TabContainer>
    <TabButton type="button" active={active} onClick={onPress}>
      <Icon name={iconName} fill={active ? theme.brand : theme.card.color} size="36" />
      <TabLabel className="small" active={active}>
        {label}
      </TabLabel>
    </TabButton>
  </TabContainer>
));

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onPress: PropTypes.func,
};

Tab.defaultProps = {
  active: false,
};

// :: Main Component
// ------------------------

const EventPanel = ({ event }) => {
  const [activeTab, setActiveTabIndex] = useState('chat');
  const channelId = event ? event.id.split(':')[1] : null;

  return (
    <EventPanelContainer className="rounded shadow">
      <PanelHeader className="shadow">
        <Tab
          id="chat"
          label="Chat Room"
          iconName="chat-conversation"
          active={activeTab === 'chat'}
          onPress={() => setActiveTabIndex('chat')}
        />
        <Tab
          id="schedule"
          label="Schedule"
          iconName="calendar-alt"
          active={activeTab === 'schedule'}
          onPress={() => setActiveTabIndex('schedule')}
        />
      </PanelHeader>
      <PanelBody>
        <TabContent active={activeTab === 'chat'}>
          <EventChat channelId={channelId} />
        </TabContent>

        <TabContent active={activeTab === 'schedule'}>
          <p>Schedule</p>
        </TabContent>
      </PanelBody>
    </EventPanelContainer>
  );
};

EventPanel.propTypes = {
  children: PropTypes.node,
  event: PropTypes.shape({
    id: PropTypes.string,
  }),
};

EventPanel.defaultProps = {};

export default EventPanel;
