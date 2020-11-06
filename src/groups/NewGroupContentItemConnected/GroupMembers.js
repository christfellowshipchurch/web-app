import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { themeGet } from 'styles/theme';

import GroupMember from './GroupMember';

// :: Styled Components
// ------------------------

const perRow = ({ perRow = 9 }) => perRow;

const MembersList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(${perRow}, 1fr);
  grid-column-gap: 1rem;
  grid-auto-rows: 1fr;
  grid-row-gap: 1.5rem;
`;

// :: Main Component
// ------------------------

const GroupMembers = ({ members, displayCount, perRow, onSeeAllClick }) => {
  const hiddenCount = members.length - displayCount;
  const showSeeAll = onSeeAllClick && hiddenCount >= 1;

  return (
    <MembersList perRow={perRow}>
      {members.slice(0, displayCount || members.length).map((member, index) => (
        <GroupMember key={member.id} index={index} member={member} />
      ))}
      {showSeeAll && (
        <GroupMember.SeeAllTile hiddenCount={hiddenCount} onClick={onSeeAllClick} />
      )}
    </MembersList>
  );
};

GroupMembers.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      nickName: PropTypes.string,
      photo: PropTypes.shape({
        uri: PropTypes.string,
      }),
    })
  ),
  displayCount: PropTypes.number,
  perRow: PropTypes.number,
  onSeeAllClick: PropTypes.func,
};

GroupMembers.defaultProps = {
  members: [],
};

export default GroupMembers;
