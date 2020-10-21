import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { get } from 'lodash';

import { baseUnit } from 'styles/theme';

import GroupBannerBackground from './GroupBannerBackground';
import GroupContent from './GroupContent';
import GroupImage from './GroupImage';

// :: Styled Components
// ------------------------

const Container = styled.div`
  display: grid;
  background: cyan;
  min-height: 75vh;
  max-width: ${({ theme }) => theme.sizing.maxPageWidth};
  margin: 0 auto;
`;

const Row = styled.div`
  max-width: 100%;
`;

// :: Main Component
// ------------------------
const NewGroup = ({
  coverImage,
  dateTimes,
  groupResources,
  onClickGroupResource,
  onClickVideoCall,
  onClickParentVideoCall,
  parentVideoCall,
  summary,
  title,
  userName,
  videoCall,
  channelId,
  members,
}) => {
  return (
    <>
      <Container>
        <Row>
          <GroupImage coverImage={coverImage} title={title} />
        </Row>
        <Row>Masthead</Row>
        <Row>Members</Row>
        <Row>Tabs</Row>
        <Row>Tab Content</Row>
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
  dateTimes: PropTypes.shape({
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
