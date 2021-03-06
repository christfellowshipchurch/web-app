import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import numeral from 'numeral';

import { breakpoint } from 'styles/theme';

import EventChat from './EventChat';
import Tab from './Tab';

// :: Styled Components
// ------------------------

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 75vh;
  overflow: hidden;
  background: ${({ theme }) => theme.body.background};
  box-shadow: ${({ theme }) => theme.shadow.card};
  border-radius: ${({ theme }) => theme.borderRadius.medium};

  ${breakpoint('sm')} {
    height: 50vh;
  }

  ${breakpoint('lg')} {
    height: 100%;
  }
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
  background: ${({ theme }) => theme.card.background};
`;

const TabContent = styled.div`
  ${({ active }) => !active && 'display: none;'}
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  overflow-y: scroll;
`;

// :: Main Component
// ------------------------

const EventPanel = ({ event, channelId, channelType }) => {
  const [activeTab, setActiveTabIndex] = useState('chat');
  const [watcherCount, setWatcherCount] = useState(null);

  const handleWatcherCountChange = useCallback(
    (num = 0) => {
      setWatcherCount(numeral(num + 1).format('0,0'));
    },
    [setWatcherCount]
  );

  return (
    <PanelContainer>
      <PanelHeader>
        <Tab
          label="Chat Room"
          subLabel={watcherCount}
          iconName="chat-conversation"
          active={activeTab === 'chat'}
          onPress={() => setActiveTabIndex('chat')}
        />
      </PanelHeader>
      <PanelBody>
        {/* Chat */}
        <TabContent active={activeTab === 'chat'}>
          <EventChat
            event={event}
            channelId={channelId}
            channelType={channelType}
            onWatcherCountChange={handleWatcherCountChange}
          />
        </TabContent>
      </PanelBody>
    </PanelContainer>
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
    events: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
      })
    ),
  }),
  channelId: PropTypes.string,
  channelType: PropTypes.string,
};

EventPanel.defaultProps = {};

export default EventPanel;
