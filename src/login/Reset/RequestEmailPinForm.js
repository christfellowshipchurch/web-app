import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import * as Yup from 'yup';
import { get } from 'lodash';
import classnames from 'classnames';

import { Card, TextInput, Button } from '../../ui';
import { Envelope } from '../../ui/Icons';
import { REQUEST_EMAIL_PIN } from '../mutations';
import { useForm } from '../../hooks';

const validation = {
  email: async (value) => {
    const schema = Yup.string().email();

    if (await schema.isValid(value)) return false;

    return 'Please enter a valid email address';
  },
};

const classes = {
  subtitle: classnames('mb-3', 'text-muted'),
  row: classnames('row', 'my-4'),
};

const RequestEmailPin = () => {
  const [pinRequested, setPinRequested] = useState(false);
  const [requestPin, { loading, error }] = useMutation(REQUEST_EMAIL_PIN);
  const { values, setValue, errors, submitting, setSubmitting } = useForm({
    validation,
    defaultValues: {
      email: '',
    },
  });

  const disabled =
    !!get(errors, 'email', false) ||
    get(values, 'email', '') === '' ||
    submitting ||
    loading ||
    error;

  const onClick = () => {
    setSubmitting(true);

    requestPin({
      variables: values,
      update: () => setPinRequested(true),
    });
  };

  return (
    <div className="container my-6 px-2">
      <div className="row justify-content-center">
        <div className="col col-md-6">
          {pinRequested ? (
            <Card>
              <h3 className="text-success font-weight-bold">Help is on the way!</h3>
              <h5 className={classes.subtitle}>
                {`An email was sent to ${values.email} with instructions on how to get your password reset.`}
              </h5>
            </Card>
          ) : (
            <Card>
              <h3>Forgot your password?</h3>

              <div className="container-fluid">
                <h5 className={classes.subtitle}>
                  We can help with that! Enter your Email Address to reset your password.
                </h5>

                <div className="row mb-4">
                  <div className="col">
                    <TextInput
                      label="Email"
                      icon={Envelope}
                      value={get(values, 'email', '')}
                      onChange={(e) => setValue('email', get(e, 'target.value', ''))}
                      error={get(errors, 'email', '')}
                    />
                  </div>
                </div>
              </div>

              {disabled ? (
                <button
                  className={classnames('btn', 'btn-primary', 'text-uppercase')}
                  disabled
                >
                  Submit
                </button>
              ) : (
                <Button
                  title="Submit"
                  disabled={disabled}
                  loading={submitting}
                  onClick={onClick}
                />
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

RequestEmailPin.propTypes = {
  email: PropTypes.string.isRequired,
  update: PropTypes.func,
  onClick: PropTypes.func,
};

RequestEmailPin.defaultProps = {
  update: () => true,
  onClick: () => true,
};

export default RequestEmailPin;
