import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

import GroupMember from './GroupMember';

// :: Styled Components
// ------------------------

const MembersList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: none;
  overflow-x: scroll;
  padding-bottom: ${baseUnit(2)};
`;

// :: Main Component
// ------------------------

const GroupMembers = ({ members }) => {
  return (
    <div>
      <h3>Members</h3>
      <MembersList>
        {members.map((member, index) => (
          <GroupMember key={member.id} index={index} member={member} />
        ))}
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
};

GroupMembers.defaultProps = {
  members: [],
};

export default GroupMembers;
