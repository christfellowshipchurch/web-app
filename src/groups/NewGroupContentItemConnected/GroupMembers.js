import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import numeral from 'numeral';

import { baseUnit, themeGet } from 'styles/theme';

import GroupMember from './GroupMember';

// :: Styled Components
// ------------------------

const MembersList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: ${baseUnit(2)};
`;

const Title = styled.h4``;

const MemberCount = styled.span`
  color: ${themeGet('font.400')};
  margin-left: ${baseUnit(1)};
  font-weight: ${themeGet('fontWeight.medium')};
`;

const SeeAllTile = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${themeGet('fontSize.small')};
  color: ${themeGet('font.300')};
  min-width: 5rem;
  width: 5rem;
  height: 6rem;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    color: ${themeGet('brand')};
    transform: scale(1.1);
  }
`;

// :: Main Component
// ------------------------

const GroupMembers = ({ members, displayCount }) => {
  const hiddenCount = members.length - displayCount;

  return (
    <div>
      <Title>
        Members <MemberCount>{numeral(members.length).format('0,0')}</MemberCount>
      </Title>
      <MembersList>
        {members.slice(0, displayCount || members.length).map((member, index) => (
          <GroupMember key={member.id} index={index} member={member} />
        ))}
        {hiddenCount >= 1 && <SeeAllTile>+{hiddenCount} more</SeeAllTile>}
      </MembersList>
    </div>
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
};

GroupMembers.defaultProps = {
  members: [],
  displayCount: 10,
};

export default GroupMembers;
