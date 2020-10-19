import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media } from '../../ui';

const GroupMembers = ({ members }) => {
  return (
    <div className="my-3">
      <h3>Members</h3>
      <div className="row my-2" style={{ overflowY: 'auto', maxHeight: 120 }}>
        {members.map((member) => (
          <div
            className="mx-1 d-flex align-items-center"
            style={{ flexDirection: 'column' }}
            key={member.id}
          >
            <Media
              key={member.id}
              imageUrl={get(member, 'photo.uri')}
              forceRatio
              style={{ height: 42, minWidth: 42, maxWidth: 42 }}
            />
            <div style={{ fontSize: '0.75rem' }}>
              {get(member, 'nickName') || get(member, 'firstName')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

GroupMembers.propTypes = {
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
};

GroupMembers.defaultProps = {
  members: [],
};

export default GroupMembers;
