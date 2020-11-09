import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';
import { Envelope, Mobile } from '../../ui/Icons';

import { TextInput, Checkbox, Loader } from '../../ui';
import { useAuthQuery } from '../../auth';

import GroupListConnected from '../../groups/GroupListConnected';
import { GET_CURRENT_PERSON } from '../queries';
import ProfileBanner from '../ProfileBanner';

const CurrentProfile = ({ onChange }) => {
  const { loading, error, data: { currentUser: { profile } = {} } = {} } = useAuthQuery(
    GET_CURRENT_PERSON
  );

  if (error) return <h1 className="text-danger">...oops</h1>;

  return [
    <ProfileBanner key={`UserProfile:ProfileBanner`} onEdit={() => onChange(true)} />,
    <div className="container-fluid mt-md-6 mt-4 mb-6 px-4" style={{ minHeight: '30vh' }}>
      <div className="row pt-2">
        <div className="col">
          <h1 className="mb-0">Your Dream Teams</h1>
        </div>
      </div>
      <GroupListConnected isDreamTeam />
    </div>,
    <div className="container-fluid mt-md-6 mt-4 mb-6 px-4">
      <div className="row pt-2">
        <div className="col">
          <h1 className="mb-0">Your Groups</h1>
        </div>
      </div>
      <GroupListConnected />
    </div>,
  ];
};

CurrentProfile.defaultProps = {
  onChange: () => true,
};

CurrentProfile.propTypes = {
  onChange: propTypes.func,
};

export default CurrentProfile;
