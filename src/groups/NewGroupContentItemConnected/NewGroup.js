import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { uniq } from 'lodash';
import numeral from 'numeral';

import { baseUnit, themeGet } from 'styles/theme';

import { Row, Col } from 'ui/grid';

// Local components in order of appearance
import GroupImage from './GroupImage';
import GroupMasthead from './GroupMasthead';
import GroupMeetingActions from './GroupMeetingActions';
import GroupMembers from './GroupMembers';
import GroupCalendarData from './GroupCalendarData';

import { GroupTabs, GroupTab, GroupTabContent } from './GroupTabs';
import GroupChat from './GroupChat';

import GroupResources from './GroupResources';
import GroupMembersModal from './GroupMembersModal';

const Tabs = Object.freeze({
  ABOUT: 'About',
  CHAT: 'Chat',
});

// :: Styled Components
// ------------------------

const Container = styled.div`
  min-height: 75vh;
  max-width: ${themeGet('sizing.maxPageWidth')};
  margin: 3rem auto 7rem;
`;

const SubTitle = styled.h4`
  margin-bottom: calc(${baseUnit(2)} + 3px);
`;

const MemberCount = styled.span`
  color: ${themeGet('font.400')};
  margin-left: ${baseUnit(1)};
  font-weight: ${themeGet('fontWeight.medium')};
`;

const EmptyStateText = styled.p`
  color: ${themeGet('font.300')};
  margin: ${baseUnit(4)} 0;
  text-align: center;
`;

// :: Main Component
// ------------------------
const NewGroup = ({
  coverImage,
  title,
  summary,
  userName,
  dateTime,
  members = [],
  leaders = [],
  parentVideoCall,
  videoCall,
  groupResources,
  channelId,
  onClickGroupResource,
  onClickVideoCall,
  onClickParentVideoCall,
}) => {
  const [activeTab, setActiveTab] = useState(Tabs.ABOUT);
  const [membersModalVisible, setMembersModalVisible] = useState(false);
  const sortedMembers = uniq([...leaders, ...members], 'id');

  const handleTabClick = (label) => setActiveTab(label);
  const handleToggleSeeAllMembers = () => setMembersModalVisible(!membersModalVisible);

  return (
    <Container>
      <Row>
        <GroupImage coverImage={coverImage} title={title} />
      </Row>
      <Row className="my-3 my-md-3 my-lg-5">
        <Col className="col-12 pl-3 pr-3  col-lg-8 pl-xl-0">
          <GroupMasthead mb={4} headline={title} />

          <SubTitle>
            Members{' '}
            <MemberCount>{numeral(sortedMembers.length).format('0,0')}</MemberCount>
          </SubTitle>
          <GroupMembers
            members={sortedMembers}
            displayCount={8}
            onSeeAllClick={handleToggleSeeAllMembers}
          />
        </Col>
        <Col className="col-12 pt-4 px-3  col-md-8 offset-md-2  col-lg-4 offset-lg-0 pt-lg-2  px-xl-0">
          <GroupCalendarData
            title={title}
            summary={summary}
            address={document.URL}
            dateTime={dateTime}
            parentVideoCall={parentVideoCall}
            videoCall={videoCall}
          />
          <GroupMeetingActions
            userName={userName}
            parentVideoCall={parentVideoCall}
            videoCall={videoCall}
            onClickVideoCall={onClickVideoCall}
            onClickParentVideoCall={onClickParentVideoCall}
          />
        </Col>
      </Row>
      <Row>
        <Col className="col-12 order-2 px-3  col-lg-8 order-lg-1  px-xl-0 pr-xl-3">
          <GroupTabs>
            <GroupTab
              label="About"
              active={activeTab === Tabs.ABOUT}
              onClick={handleTabClick}
            />
            <GroupTab
              label="Chat"
              active={activeTab === Tabs.CHAT}
              onClick={handleTabClick}
            />
          </GroupTabs>
          <GroupTabContent active={activeTab === Tabs.ABOUT}>
            {summary ? (
              <p>{summary}</p>
            ) : (
              <EmptyStateText>No group description</EmptyStateText>
            )}
          </GroupTabContent>
          <GroupTabContent active={activeTab === Tabs.CHAT}>
            <GroupChat channelId={channelId} />
          </GroupTabContent>
        </Col>
        <Col className="col-12 order-1 mt-3 mb-4 px-3  col-md-8 offset-md-2  col-lg-4 offset-lg-0 order-lg-2 mt-lg-0 mb-lg-0 px-lg-0 pr-lg-3">
          <GroupResources
            resources={groupResources}
            onResourceClick={onClickGroupResource}
          />
        </Col>
      </Row>
      <GroupMembersModal
        visible={membersModalVisible}
        members={sortedMembers}
        onPressExit={handleToggleSeeAllMembers}
      />
    </Container>
  );
};

const PersonPropType = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  nickName: PropTypes.string,
  photo: PropTypes.shape({
    uri: PropTypes.string,
  }),
});

NewGroup.propTypes = {
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }).isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,
  userName: PropTypes.string,
  dateTime: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }),
  leaders: PropTypes.arrayOf(PersonPropType),
  members: PropTypes.arrayOf(PersonPropType),
  parentVideoCall: PropTypes.shape({
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
  videoCall: PropTypes.shape({
    labelText: PropTypes.shape,
    link: PropTypes.string,
    meetingId: PropTypes.string,
    passcode: PropTypes.string,
  }),
  groupResources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  channelId: PropTypes.string,
  onClickGroupResource: PropTypes.func,
  onClickParentVideoCall: PropTypes.func,
  onClickVideoCall: PropTypes.func,
};

export default NewGroup;
