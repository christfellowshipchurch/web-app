import React from 'react';
import PropTypes from 'prop-types';

import { Media } from '../../ui';

const GroupMembers = ({ avatars }) => {
  return (
    <div className="my-3">
      <h3>Members</h3>
      <div className="row my-2" style={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
        {avatars.map((avatar) => (
          <Media
            className="mx-1"
            imageUrl={avatar}
            forceRatio
            style={{ height: 42, minWidth: 42 }}
          />
        ))}
      </div>
    </div>
  );
};

GroupMembers.propTypes = {
  avatars: PropTypes.arrayOf(PropTypes.string),
};

GroupMembers.defaultProps = {
  avatars: [],
};

export default GroupMembers;
