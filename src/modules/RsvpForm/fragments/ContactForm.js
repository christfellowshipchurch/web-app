import React from 'react';
import PropTypes from 'prop-types';
import { get, has } from 'lodash';
import { Envelope } from '../../../ui/Icons';
import { TextInput } from '../../../ui';

const ContactForm = ({ errors, setFieldValue, values, loading }) => (
  <React.Fragment>
    <div className="row mb-4">
      <div className="col">
        <TextInput
          type="email"
          disabled={loading}
          label="Email Address"
          icon={Envelope}
          value={get(values, 'email', '')}
          onChange={(e) => setFieldValue('email', get(e, 'target.value', ''))}
          error={
            has(values, 'email') && has(errors, 'email')
              ? get(errors, 'email', null)
              : null
          }
        />
      </div>
    </div>
  </React.Fragment>
);

ContactForm.propTypes = {
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  loading: PropTypes.bool,
};

export default ContactForm;
