import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';
import { Envelope, Mobile } from '../../ui/Icons';

import { TextInput, Checkbox } from '../../ui';
import { useAuthQuery } from '../../auth';

import { GET_CURRENT_PERSON } from '../queries';
import ProfileBanner from '../ProfileBanner';

const CurrentProfile = ({ onChange }) => {
  const { loading, error, data: { currentUser: { profile } = {} } = {} } = useAuthQuery(
    GET_CURRENT_PERSON
  );

  const headerClass = classnames('mb-3', 'mt-5');

  if (error) return <h1 className="text-danger">...oops</h1>;

  const birthDate = get(profile, 'birthDate', '');
  const address = get(profile, 'address', {});

  const loadingTextClass = loading ? 'loading-bar w-50' : 'font-weight-light';

  return [
    <ProfileBanner key={`UserProfile:ProfileBanner`} onEdit={() => onChange(true)} />,
    <div key={`UserProfile:ProfileFields`} className="container my-4">
      <div className="row">
        <div
          className={classnames('col-md-6', 'col-12', 'text-left', 'pl-4', 'profile-bar')}
        >
          <h4 className={headerClass}>My Campus</h4>
          <h4 className={`${loadingTextClass} mb-5`}>
            {get(profile, 'campus.name', '')}
          </h4>
          <h4 className={headerClass}>Home Address</h4>
          <h4 className={`${loadingTextClass}`}>{get(profile, 'address.street1', '')}</h4>
          <h4 className={`${loadingTextClass} mb-5`}>
            {`${get(address, 'city', '')} ${get(address, 'state', '')} ${get(
              address,
              'postalCode',
              ''
            ).substring(0, 5)}`}
          </h4>
          <h4 className={headerClass}>Date of Birth</h4>
          <h4 className={`${loadingTextClass} mb-5`}>
            {moment(birthDate).isValid() && moment(birthDate).format('MMM DD, YYYY')}
          </h4>
          <h4 className={headerClass}>Gender</h4>
          <h4 className={`${loadingTextClass} mb-5`}>{get(profile, 'gender', '')}</h4>
        </div>
        <div className={classnames('col-md-6', 'col-12', 'text-left', 'pl-4', 'pr-3')}>
          <h4 className="mt-5 mb-3">Communication Preferences</h4>
          <TextInput
            icon={Envelope}
            value={get(profile, 'email', '')}
            label="Email"
            readOnly
          />

          <div className="d-flex align-items-center mb-5 mt-2 ml-1">
            <Checkbox
              disabled
              checked={get(profile, 'communicationPreferences.allowEmail', false)}
            />
            <p className="mb-0 ml-2">Allow Email Notifications</p>
          </div>

          <TextInput
            icon={Mobile}
            value={get(profile, 'phoneNumber', '')}
            label="Mobile Phone"
            readOnly
          />

          <div className="d-flex align-items-center mb-4 mt-2 ml-1">
            <Checkbox
              disabled
              random
              checked={get(profile, 'communicationPreferences.allowSMS', false)}
            />
            <p className="mb-0 ml-2">Allow Text Notifications</p>
          </div>
        </div>
      </div>
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
