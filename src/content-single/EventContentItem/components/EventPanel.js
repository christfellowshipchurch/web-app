import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components/macro';

import { baseUnit } from 'styles/config';

import { Icon } from 'ui/Icons';

// :: Styled Components
// ------------------------

const EventPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.body.background};
`;

const Tabs = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.card.background};
`;

const TabContainer = styled.div`
  display: inline-flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${baseUnit(2)} ${baseUnit(3)}};
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

const TabContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  z-index: 0;
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
const EventPanel = ({ children }) => {
  const [activeTab, setActiveTabIndex] = useState('chat');

  return (
    <EventPanelContainer className="rounded shadow">
      <Tabs className="shadow">
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
      </Tabs>
      <TabContent>
        <div style={{ display: activeTab === 'chat' ? 'block' : 'none' }}>{children}</div>
        <p style={{ display: activeTab === 'schedule' ? 'block' : 'none' }}>Schedule</p>
      </TabContent>
    </EventPanelContainer>
  );
};

EventPanel.propTypes = {
  children: PropTypes.node,
};

EventPanel.defaultProps = {};

export default EventPanel;
