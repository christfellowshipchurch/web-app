import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { breakpoint } from 'styles/theme';

import { uniqBy } from 'lodash';
import GroupMember from './GroupMember';

// :: Styled Components
// ------------------------

const DISPLAY_COUNT = 9;
const HALF_DISPLAY_COUNT = Math.ceil(DISPLAY_COUNT / 2);

const columnCount = ({ showAll }) => (showAll ? HALF_DISPLAY_COUNT : DISPLAY_COUNT + 1);

const MembersList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(${HALF_DISPLAY_COUNT}, 1fr);
  grid-column-gap: 1rem;
  grid-auto-rows: 1fr;
  grid-row-gap: 1.5rem;

  ${breakpoint('md')} {
    grid-template-columns: repeat(${columnCount}, 1fr);
  }
`;

// :: Main Component
// ------------------------

const GroupMembers = ({ members, showAll, onSeeAllClick }) => {
  const displayCount = showAll ? members.length : DISPLAY_COUNT;
  const hiddenCount = members.length - displayCount;
  const showSeeAll = onSeeAllClick && hiddenCount >= 1;

  return (
    <MembersList showAll={showAll}>
      {uniqBy(members, 'id')
        .slice(0, displayCount)
        .map((member, index) => (
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
  showAll: PropTypes.bool,
  onSeeAllClick: PropTypes.func,
};

GroupMembers.defaultProps = {
  members: [],
};

export default GroupMembers;
