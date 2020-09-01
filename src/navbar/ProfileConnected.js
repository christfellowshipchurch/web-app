import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useAuth, useAuthQuery } from '../auth';

import { Media, Loader } from '../ui';
import { Icon } from '../ui/Icons';
import { GET_PROFILE_IMAGE } from './queries';

const ProfileConnected = ({ size }) => {
  const { logIn, isLoggedIn } = useAuth();
  const { error, loading, data } = useAuthQuery(GET_PROFILE_IMAGE);

  const hasPhoto = get(data, 'currentUser.profile.photo.uri', '');

  if (error) {
    console.log('Profile Error', error);
    return null;
  }

  if (loading) return <Loader />;

  return isLoggedIn ? (
    <a href="/profile" style={hasPhoto && { width: size, height: size }}>
      <span className="d-flex">
        {hasPhoto ? (
          <Media
            imageUrl={get(data, 'currentUser.profile.photo.uri', '')}
            imageAlt={`Christ Fellowship Church - ${get(
              data,
              'currentUser.profile.firstName'
            )}`}
            ratio="1by1"
            circle
            className="opacity-hover"
            style={{ width: size, height: size }}
          />
        ) : (
          <Icon
            className="pr-1"
            name="user-circle"
            fill="#00aeef"
            style={{ width: size, height: size }}
          />
        )}
      </span>
    </a>
  ) : (
    <Icon onClick={() => logIn()} name="user-circle" fill="#525252" size={32} />
  );
};

ProfileConnected.propTypes = {
  size: PropTypes.number,
};

ProfileConnected.defaultProps = {
  size: 45,
};

export default ProfileConnected;
