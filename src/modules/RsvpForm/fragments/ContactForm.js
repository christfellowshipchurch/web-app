import React from 'react';
import { get, has } from 'lodash';
import { Envelope, PhoneAlt } from '../../../ui/Icons';
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
    {/* Temporarily removed phone number from RSVP */}
    {/* <div className="row mb-4">
      <div className="col">
        <TextInput
          type="phone"
          disabled={loading}
          label="Phone Number"
          icon={PhoneAlt}
          value={get(values, 'phoneNumber', '')}
          onChange={(e) => setFieldValue('phoneNumber', get(e, 'target.value', ''))}
          error={
            has(values, 'phoneNumber') && has(errors, 'phoneNumber')
              ? get(errors, 'phoneNumber', null)
              : null
          }
        />
      </div>
    </div> */}
  </React.Fragment>
);

export default ContactForm;
