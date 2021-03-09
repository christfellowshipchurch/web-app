import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';
import { Church } from '../../ui/Icons';
import { Dropdown } from '../../ui';
import { GET_STATES, GET_CAMPUSES } from '../queries';

export const CampusSelection = ({ onChange, value, label }) => {
  const { data, loading, error } = useQuery(GET_CAMPUSES, {
    fetchPolicy: 'cache-and-network',
  });
  const disabled = loading || error;

  return (
    <Dropdown
      options={get(data, 'campuses', []).map(({ id, name }) => ({
        value: id,
        label: name,
      }))}
      onChange={(e) => onChange(e)}
      disabled={disabled}
      value={disabled ? '' : value}
      label={label}
      icon={Church}
    />
  );
};

CampusSelection.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};

CampusSelection.defaultProps = {
  onChange: () => true,
  value: '',
  label: '',
};

export const StateSelection = ({ onChange, value, label }) => {
  const { data, loading, error } = useQuery(GET_STATES, {
    fetchPolicy: 'cache-and-network',
  });
  const disabled = loading || error;

  return (
    <Dropdown
      options={get(data, 'getStatesList.values', []).map(({ value }) => value)}
      onChange={(e) => onChange(e)}
      disabled={disabled}
      value={disabled ? '' : value}
      label={label}
      hideIcon
    />
  );
};

StateSelection.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};

StateSelection.defaultProps = {
  onChange: () => true,
  value: '',
  label: '',
};
