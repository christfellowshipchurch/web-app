import React, { useState } from 'react';
import { useMutation, useLazyQuery } from 'react-apollo';
import { get, has } from 'lodash';
import * as Yup from 'yup';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useForm } from '../../hooks';
import { parseUsername } from '../utils';

import { REQUEST_PIN } from '../mutations';
import { USER_EXISTS } from '../queries';

import { Checkbox, TextInput, Button } from '../../ui';
import { Icon } from '../../ui/Icons';

const validation = {
  identity: async (value) => {
    const schema = Yup.string();
    const isValid = await schema.isValid(value);

    if (isValid && value !== '') {
      const { email, phoneNumber } = await parseUsername(value);

      if (email || phoneNumber) return false;
    }

    return 'Please enter a valid phone number or email';
  },
};

const IdentityForm = ({
  promptText,
  buttonText,
  dislaimerText,
  inputLabel,
  update,
  columns,
}) => {
  const { values, errors, submitting, setValue, setSubmitting } = useForm({
    validation,
    defaultValues: {
      privacyPolicyAgreement: false,
    },
  });
  const [showAlert, setShowAlert] = useState(false);
  const [requestPin] = useMutation(REQUEST_PIN);
  const [checkIfUserExists] = useLazyQuery(USER_EXISTS, {
    fetchPolicy: 'network-only',
    onCompleted: async (data) => {
      const userExists = get(data, 'userExists', 'NONE') !== 'NONE';
      const identity = get(values, 'identity', '');
      const { email, phoneNumber } = await parseUsername(identity);

      if (userExists && phoneNumber) {
        requestPin({
          variables: {
            phone: identity,
          },
          update: (
            cache,
            {
              data: {
                requestSmsLoginPin: { success },
              },
            }
          ) => {
            if (success) {
              // navigate to Passcode validation
              update({ identity, type: 'sms', userExists });
            } else {
              // show some error on the screen
            }

            setSubmitting(false);
          },
          onError: () => setSubmitting(false),
        });
      } else if (email || phoneNumber) {
        // identity is confirmed to be either phone number or email
        update({ identity, type: phoneNumber ? 'sms' : 'password', userExists });
        setSubmitting(false);
      } else {
        setSubmitting(false);
        // error handling cause the identity is neither phone nor email
      }
    },
  });

  const onClick = async () => {
    if (get(values, 'privacyPolicyAgreement', false)) {
      setSubmitting(true);
      const identity = get(values, 'identity', '');
      checkIfUserExists({ variables: { identity } });
    } else {
      // Informs users to agree to terms & conditions
      setShowAlert(true);
    }
  };

  const disabled =
    !!get(errors, 'identity', true) ||
    !get(values, 'privacyPolicyAgreement', false) ||
    submitting;

  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-12">
          <p className="mb-0 pb-3">{promptText}</p>
        </div>
      </div>

      <div className="row my-3 justify-content-center">
        <div className={classnames(columns)}>
          <TextInput
            label={inputLabel}
            error={get(errors, 'identity', '')}
            onChange={(e) => setValue('identity', get(e, 'target.value', ''))}
            value={get(values, 'identity', '')}
            disabled={submitting}
            value={get(values, 'identity', '')}
          />
        </div>
      </div>

      <div className="row my-4 text-center justify-content-center">
        <div className={classnames(columns)}>
          {showAlert && (
            <div className="d-flex align-items-center ml-1">
              <Icon name="exclamation-circle" fill="#cb045b" />
              <p className="mb-0 p-1 font-italic" style={{ fontSize: 13 }}>
                Please Agree to the Terms and Conditions
              </p>
            </div>
          )}
          <Checkbox
            error={
              has(errors, 'privacyPolicyAgreement') &&
              get(errors, 'privacyPolicyAgreement', '')
            }
            label={dislaimerText}
            onClick={() =>
              setValue(
                'privacyPolicyAgreement',
                !get(values, 'privacyPolicyAgreement', true)
              )
            }
            checked={get(values, 'privacyPolicyAgreement', false)}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="my-3 text-center">
        <Button
          onClick={onClick}
          disabled={disabled}
          loading={submitting}
          title={buttonText}
        />
      </div>
    </div>
  );
};

IdentityForm.propTypes = {
  titleText: PropTypes.string,
  inputLabel: PropTypes.string,
  promptText: PropTypes.string,
  buttonText: PropTypes.string,
  dislaimerText: PropTypes.string,
  update: PropTypes.func,
  columns: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

IdentityForm.defaultProps = {
  titleText: 'Welcome Home!',
  inputLabel: 'Mobile Number or Email',
  promptText:
    "Get started by entering in either your phone number or email address. We'll never share your information or contact you (unless you ask!).",
  buttonText: 'Agree and Continue',
  dislaimerText: 'I agree to the policies laid out by Christ Fellowship Church',
  update: () => true,
  columns: 'col',
};

export default IdentityForm;
