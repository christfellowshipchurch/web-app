import React from 'react';
import PropTypes from 'prop-types';
import { get, has } from 'lodash';
import { User } from '../../../ui/Icons';
import { TextInput } from '../../../ui';

const DemographicForm = ({ errors, setFieldValue, values, loading }) => (
  <React.Fragment>
    <div className="row my-4">
      <div className="col">
        <TextInput
          label="First Name"
          value={get(values, 'firstName', '')}
          onChange={(e) => setFieldValue('firstName', get(e, 'target.value', ''))}
          icon={User}
          disabled={loading}
          error={
            has(values, 'firstName') && has(errors, 'firstName')
              ? get(errors, 'firstName', null)
              : null
          }
        />
      </div>
    </div>
    <div className="row my-4">
      <div className="col">
        <TextInput
          label="Last Name"
          value={get(values, 'lastName', '')}
          onChange={(e) => setFieldValue('lastName', get(e, 'target.value', ''))}
          icon={User}
          disabled={loading}
          error={
            has(values, 'lastName') && has(errors, 'lastName')
              ? get(errors, 'lastName', null)
              : null
          }
        />
      </div>
    </div>
  </React.Fragment>
);

DemographicForm.propTypes = {
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  loading: PropTypes.bool,
};

export default DemographicForm;
