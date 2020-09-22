import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import EventScheduleConnected from './EventScheduleConnected';
import EventChat from './EventChat';
import Tab from './Tab';

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
  box-shadow: ${({ theme }) => theme.shadow.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const PanelHeader = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.card.background};
  box-shadow: ${({ theme }) => theme.shadow.small};
  z-index: 1;
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

// :: Main Component
// ------------------------

const EventPanel = ({ event }) => {
  const [activeTab, setActiveTabIndex] = useState('schedule');
  const channelId = event ? event.id.split(':')[1] : null;

  return (
    <EventPanelContainer>
      <PanelHeader>
        <Tab
          label="Chat Room"
          iconName="chat-conversation"
          active={activeTab === 'chat'}
          onPress={() => setActiveTabIndex('chat')}
        />
        <Tab
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
          <EventScheduleConnected
            id={event.id}
            callsToAction={event.callsToAction}
            openLinksInNewTab={event.openLinksInNewTab}
            events={event.events}
            title={event.title}
            description={event.htmlContent}
          />
        </TabContent>
      </PanelBody>
    </EventPanelContainer>
  );
};

EventPanel.propTypes = {
  children: PropTypes.node,
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    htmlContent: PropTypes.string,
    callsToAction: PropTypes.arrayOf(
      PropTypes.shape({
        call: PropTypes.string,
        action: PropTypes.string,
      })
    ),
    openLinksInNewTab: PropTypes.bool,
    events: PropTypes.object,
  }),
};

EventPanel.defaultProps = {};

export default EventPanel;
