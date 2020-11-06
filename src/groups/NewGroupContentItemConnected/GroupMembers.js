import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media } from 'ui';

const GroupMembers = ({ people }) => {
  return (
    <div className="my-3">
      <h3>Members</h3>
      <div className="row my-2" style={{ overflowY: 'auto', maxHeight: 120 }}>
        {people.map((person) => (
          <div
            className="mx-1 d-flex align-items-center"
            style={{ flexDirection: 'column' }}
            key={person.id}
          >
            <Media
              key={person.id}
              imageUrl={get(person, 'photo.uri')}
              forceRatio
              style={{ height: 42, minWidth: 42, maxWidth: 42 }}
            />
            <div style={{ fontSize: '0.75rem' }}>
              {get(person, 'nickName') || get(person, 'firstName')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

GroupMembers.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        nickName: PropTypes.string,
        photo: PropTypes.shape({
          uri: PropTypes.string,
        }),
      }),
      isGroupLeader: PropTypes.bool,
    })
  ),
};

GroupMembers.defaultProps = {
  people: [],
};

export default GroupMembers;
