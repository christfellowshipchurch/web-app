import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import numeral from 'numeral';

import { baseUnit, themeGet } from 'styles/theme';

import { FloatingCard } from 'ui';

import GroupMembers from './GroupMembers';

// :: Styled Components
// ------------------------

const Title = styled.h2`
  color: ${themeGet('font.h2')};
  margin-bottom: ${baseUnit(3)};
`;

const MemberCount = styled.span`
  color: ${themeGet('font.400')};
  margin-left: ${baseUnit(1)};
  font-weight: ${themeGet('fontWeight.medium')};
`;

const VerticalScrollBox = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  max-height: 600px;
  overflow-y: scroll;
`;

const GroupMembersModal = ({ visible, members, onPressExit }) => {
  if (!visible) return null;

  return (
    <FloatingCard bodyClassNames={'pl-4 pt-0 pb-4 pr-0'} onPressExit={onPressExit}>
      <Title>
        Group Members <MemberCount>{numeral(members.length).format(0, 0)}</MemberCount>
      </Title>
      <VerticalScrollBox className="pr-4">
        <GroupMembers members={members} showAll />
      </VerticalScrollBox>
    </FloatingCard>
  );
};

GroupMembersModal.propTypes = {
  visible: PropTypes.bool,
  members: GroupMembers.propTypes.members,
  onPressExit: PropTypes.func,
};

export default GroupMembersModal;
