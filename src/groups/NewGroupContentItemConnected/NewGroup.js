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
import GroupCTAs from './GroupCTAs';
import GroupMembers from './GroupMembers';
import GroupCalendarData from './GroupCalendarData';

import { GroupTabs, GroupTab, GroupTabContent } from './GroupTabs';
import GroupChat from './GroupChat';

import GroupResources from './GroupResources';
import GroupMembersModal from './GroupMembersModal';

// :: Styled Components
// ------------------------

const Container = styled.div`
  min-height: 75vh;
  max-width: ${({ theme }) => theme.sizing.maxPageWidth};
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
  const [activeTab, setActiveTab] = useState('About');
  const [membersModalVisible, setMembersModalVisible] = useState(false);
  const sortedMembers = uniq([...leaders, ...members], 'id');

  const handleTabClick = (label) => setActiveTab(label);
  const handleToggleSeeAllMembers = () => setMembersModalVisible(!membersModalVisible);

  return (
    <Container>
      <Row>
        <GroupImage coverImage={coverImage} title={title} />
      </Row>
      <Row className="my-5">
        <Col className="col-12 col-lg-8 pr-lg-3">
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
        <Col className="col-12 col-lg-4 pt-2">
          <GroupCalendarData
            title={title}
            summary={summary}
            address={document.URL}
            dateTime={dateTime}
            calendarLinkDescription={'BLah'}
          />
          <GroupCTAs parentVideoCall={parentVideoCall} videoCall={videoCall} />
        </Col>
      </Row>
      <Row>
        <Col className="col-12 col-lg-8 pr-lg-3">
          <GroupTabs>
            <GroupTab
              label="About"
              active={activeTab === 'About'}
              onClick={handleTabClick}
            />
            <GroupTab
              label="Chat"
              active={activeTab === 'Chat'}
              onClick={handleTabClick}
            />
          </GroupTabs>
          <GroupTabContent active={activeTab === 'About'}>
            <p>{summary || <i>No group description</i>}</p>
          </GroupTabContent>
          <GroupTabContent active={activeTab === 'Chat'}>
            <GroupChat channelId={channelId} />
          </GroupTabContent>
        </Col>
        <Col className="col-12 col-lg-4">
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
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      nickName: PropTypes.string,
      photo: PropTypes.shape({
        uri: PropTypes.string,
      }),
    })
  ),
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
