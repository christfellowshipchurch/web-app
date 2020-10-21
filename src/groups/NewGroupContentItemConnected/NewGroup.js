import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import moment from 'moment';
import { get } from 'lodash';

import { baseUnit } from 'styles/theme';

import dateTextFormat from 'groups/dateTextFormat';

import GroupBannerBackground from './GroupBannerBackground';
import GroupContent from './GroupContent';

// Cast, in order of appearance
import GroupImage from './GroupImage';
import GroupMasthead from './GroupMasthead';
import GroupCTAs from './GroupCTAs';

// :: Styled Components
// ------------------------

const Container = styled.div`
  display: grid;
  background: cyan;
  min-height: 75vh;
  max-width: ${({ theme }) => theme.sizing.maxPageWidth};
  margin: 0 auto;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    'cover-image cover-image'
    'masthead ctas'
    'members members'
    'tabs tabs'
    'content content';
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
`;

const Area = styled.div`
  grid-area: ${({ area }) => area};
`;

// :: Main Component
// ------------------------
const NewGroup = ({
  coverImage,
  title,
  summary,
  userName,
  dateTime,
  members,
  parentVideoCall,
  videoCall,
  groupResources,
  channelId,
  onClickGroupResource,
  onClickVideoCall,
  onClickParentVideoCall,
}) => {
  console.log('[rkd] dateTime:', dateTime);
  const groupMeetingTime = dateTextFormat(get(dateTime, 'start'));

  return (
    <>
      <Container>
        <Area area="cover-image">
          <GroupImage coverImage={coverImage} title={title} />
        </Area>
        <Area area="masthead">
          <GroupMasthead headline={title} subHeadline={groupMeetingTime} />
        </Area>
        <Area area="ctas">
          <GroupCTAs parentVideoCall={parentVideoCall} videoCall={videoCall} />
        </Area>
        <Area area="members">Members</Area>
        <Area area="tabs">Tabs</Area>
        <Area area="content">Content</Area>
      </Container>
    </>
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
