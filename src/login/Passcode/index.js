import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { get, has } from 'lodash';
import * as Yup from 'yup';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { faLockAlt } from '@fortawesome/fontawesome-pro-light';

import {
    TextInput,
    Button,
    Loader,
} from '../../ui';
import { useAuth } from '../../auth';
import { useForm } from '../../hooks';

import {
    AUTHENTICATE_CREDENTIALS, VERIFY_PIN, REGISTER_WITH_SMS, REGISTER_WITH_EMAIL,
} from '../mutations';
import { USER_EXISTS } from '../queries';


import { RequestEmailPin } from '../Reset';
import ResendSMS from '../ResendSMS';

const PasscodeForm = ({
    identity,
    userProfile,
    isExistingIdentity,
    promptText,
    buttonText,
    inputLabel,
    type,
    update,
    columns,
}) => {
    const {
        values,
        errors,
        submitting,
        setValue,
        setSubmitting,
        setError,
    } = useForm();
    const [authenticateCredentials] = useMutation(AUTHENTICATE_CREDENTIALS);
    const [verifyPin] = useMutation(VERIFY_PIN);
    const [registerWithSms] = useMutation(REGISTER_WITH_SMS);
    const [registerWithEmail] = useMutation(REGISTER_WITH_EMAIL);
    const onUpdate = (props) => {
        setSubmitting(false);
        update(props);
    };

    const onClick = async () => {
        setSubmitting(true);
        const { passcode } = values;

        // isExisitingIdentity checks for an existing Sms login
        // password logins aren't known to be existing or not until the authentication is run
        if (isExistingIdentity) {
            if (type === 'sms') {
                try {
                    await verifyPin({
                        variables: { phone: identity, code: passcode },
                        update: (cache, { data: { authenticateWithSms: { token } = {} } = {} }) => {
                            onUpdate({ token });
                        },
                        onError: () => {
                            // the code or password entered was for an existing user login and was incorrect
                            setError('passcode', `The ${inputLabel[type]} you entered is incorrect`);
                            setSubmitting(false);
                        },
                    });
                } catch (e) {
                    setError('passcode', `The ${inputLabel[type]} you entered is incorrect`);
                    setSubmitting(false);
                }
            } else if (type === 'password') {
                console.log('EXISTING PERSON');
                try {
                    await authenticateCredentials({
                        variables: { email: identity, password: passcode },
                        update: (cache, { data: { authenticate: { token } = {} } = {} }) => {
                            onUpdate({ token });
                        },
                        onError: () => {
                            // the code or password entered was for an existing user login and was incorrect
                            setError('passcode', `The ${inputLabel[type]} you entered is incorrect`);
                            setSubmitting(false);
                        },
                    });
                } catch (e) {
                    setError('passcode', `The ${inputLabel[type]} you entered is incorrect`);
                    setSubmitting(false);
                }
            }
        } else if (type === 'sms') {
            try {
                await registerWithSms({
                    variables: { identity, password: passcode, userProfile },
                    update: (cache, { data: { registerWithSms: { token } = {} } = {} }) => {
                        onUpdate({ token });
                    },
                    onError: () => {
                        // the code or password entered was for an existing user login and was incorrect
                        setError('passcode', `The ${inputLabel[type]} you entered is incorrect`);
                        setSubmitting(false);
                    },
                });
            } catch (e) {
                setError('passcode', 'There was an error creating your account. Please try again.');
                setSubmitting(false);
            }
        } else if (type === 'password') {
            console.log('NEW PERSON');
            try {
                await registerWithEmail({
                    variables: { identity, password: passcode, userProfile },
                    update: (cache, { data: { registerPerson: { token } = {} } = {} }) => {
                        onUpdate({ token });
                    },
                    onError: () => {
                        // the code or password entered was for an existing user login and was incorrect
                        setError('passcode', 'There was an error creating your account. Please try again.');
                        setSubmitting(false);
                    },
                });
            } catch (e) {
                setError('passcode', 'There was an error creating your account. Please try again.');
                setSubmitting(false);
            }
        }
    };

    const inputType = type === 'sms' ? 'numeric' : 'password';
    const disabled = submitting
        || !!get(errors, 'passcode', false)
        || get(values, 'passcode', '') === ''
        || identity === '';

    return (
        <div className="container">
            <div className="row">
                <div className="col my-2 justify-content-center">
                    <p className="mb-0">
                        {promptText[type]}
                    </p>
                </div>
            </div>

            <div className="row my-2 justify-content-center">
                <div className={classnames(columns)}>
                    <TextInput
                        icon={faLockAlt}
                        type={inputType}
                        error={has(errors, 'passcode') && get(errors, 'passcode', '')}
                        label={inputLabel[type]}
                        onChange={(e) => setValue('passcode', get(e, 'target.value', ''))}
                        disabled={submitting}
                        value={get(values, 'passcode', '')}
                    />
                </div>
            </div>

            <div className="row py-2">
                <div className="col-12 text-center">
                    <Button
                        title={buttonText}
                        disabled={disabled}
                        onClick={onClick}
                        loading={submitting}
                    />
                </div>

                {type === 'password'
                    && identity
                    && identity !== ''
                    && isExistingIdentity
                    && (
                        <div className="col-12 text-center my-4">
                            <RequestEmailPin
                                email={identity}
                                update={() => update({ requestedEmailPin: true })}
                                onClick={() => setSubmitting(true)}
                            >
                                Forgot your password? We can help with that!
                      </RequestEmailPin>
                        </div>
                    )}
                {type === 'sms' && identity && identity !== ''
                    && (
                        <div className="col-12 text-center my-3">
                            <ResendSMS phoneNumber={identity}>Didn't get a code? Request a new one.</ResendSMS>
                        </div>
                    )}
            </div>
        </div>
    );
};

PasscodeForm.defaultProps = {
    identity: '',
    isExistingIdentity: false,
    titleText: {
        sms: 'Confirmation Code',
        password: 'Password',
    },
    promptText:
    {
        sms: 'Enter in the Confirmation Code that was texted to your mobile phone number.',
        password: 'Enter in your existing password or create your password below.',
    },
    buttonText: 'Submit',
    inputLabel: {
        sms: 'Confirmation Code',
        password: 'Password',
    },
    type: 'sms',
    update: () => true,
    columns: 'col',
};

PasscodeForm.propTypes = {
    identity: PropTypes.string,
    isExistingIdentity: PropTypes.bool,
    titleText: PropTypes.shape({
        sms: PropTypes.string,
        password: PropTypes.string,
    }),
    propmtText: PropTypes.shape({
        sms: PropTypes.string,
        password: PropTypes.string,
    }),
    inputLabel: PropTypes.shape({
        sms: PropTypes.string,
        password: PropTypes.string,
    }),
    type: PropTypes.oneOf(['sms', 'password']),
    buttonText: PropTypes.string,
    update: PropTypes.func,
    columns: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
};

export default PasscodeForm;
