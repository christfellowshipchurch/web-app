import React from 'react';
import { useMutation } from 'react-apollo';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import QueryString from 'query-string';
import * as Yup from 'yup';
import { get, has } from 'lodash';
import { Redirect } from 'react-router-dom';

import {
    LockAlt,
    Envelope,
} from '../../ui/Icons';

import { Card, TextInput, Button } from '../../ui';

import { redirectTo } from '../../utils';
import { useAuth } from '../../auth';
import { useForm } from '../../hooks';
import { REQUEST_PASSWORD_CHANGE } from '../mutations';

const validation = {
    email: async (value) => {
        const schema = Yup.string().email();

        if (await schema.isValid(value)) return false;

        return 'Please enter a valid email address';
    },
    confirmationCode: (value) => (value && value !== ''
        ? false
        : 'Enter in a confirmation code'),
    password: (value) => (value && value !== ''
        ? false
        : 'Enter a new password'),
    confirmPassword: (value, values) => {
        const password = get(values, 'password', null);

        if (password && password === value) return false;

        return 'Please make sure you enter in the same password as above.';
    },
};

const classes = {
    subtitle: classnames(
        'mt-5',
        'mb-3',
        'text-muted',
    ),
    row: classnames(
        'row',
        'my-4',
    ),
};

const ResetPassword = ({
    title,
    description,
    location: { search },
}) => {
    const [requestPasswordChange] = useMutation(REQUEST_PASSWORD_CHANGE);
    const parsedQueryStrings = QueryString.parse(search);
    const {
        values,
        setValue,
        errors,
        submitting,
        setSubmitting,
        setError,
    } = useForm({
        validation,
        defaultValues: {
            email: get(parsedQueryStrings, 'email', ''),
        },
    });

    const onClick = async () => {
        const variables = {
            email: get(values, 'email', ''),
            pin: get(values, 'confirmationCode', ''),
            newPassword: get(values, 'password', ''),
        };

        setSubmitting(true);

        try {
            await requestPasswordChange({
                variables,
                update: (_, { data: { changePasswordWithPin } }) => {
                    const token = get(changePasswordWithPin, 'token', null);

                    if (token) {
                        setValue('updated', true);
                    } else {
                        setError('password', 'We were unable to update your password. Please try again.');
                        setSubmitting(false);
                    }
                },
                onError: () => {
                    setError('password', 'We were unable to update your password. Please try again.');
                },
            });
        } catch (e) {
            setError('confirmationCode', 'Make sure you entered in the right Confirmation Code');
            setSubmitting(false);
        }
    };

    const disabled = !!get(errors, 'email', false)
        || !!get(errors, 'confirmPassword', true)
        || get(values, 'email', '') === ''
        || get(values, 'confirmationCode', '') === ''
        || get(values, 'password', '') === ''
        || get(values, 'confirmPassword', '') === ''
        || submitting;

    return has(parsedQueryStrings, 'email') || true
        ? (
            <div className="container my-6">
                <div className="row justify-content-center">
                    <div className="col col-md-6">
                        {values.updated
                            ? (
                                <Card>
                                    <h3 className="text-success">Your password has successfully been updated!</h3>
                                </Card>
                            )
                            : (
                                <Card>
                                    <h3>
                                        {title}
                                        <br />
                                        <small>
                                            {description}
                                        </small>
                                    </h3>

                                    <div className="container-fluid">
                                        <h5 className={classes.subtitle}>
                                            Enter your Email Address and the Confirmation Code that was sent to your email.
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

                                        <div className={classes.row}>
                                            <div className="col">
                                                <TextInput
                                                    label="Confirmation Code"
                                                    icon={LockAlt}
                                                    type="number"
                                                    onChange={(e) => setValue('confirmationCode', get(e, 'target.value', ''))}
                                                    error={get(errors, 'confirmationCode', '')}
                                                    value={get(values, 'confirmationCode', '')}
                                                />
                                            </div>
                                        </div>

                                        <h5 className={classes.subtitle}>
                                            Enter your new desired Password down below.
                    </h5>

                                        <div className="row mb-4">
                                            <div className="col">
                                                <TextInput
                                                    label="Password"
                                                    icon={LockAlt}
                                                    type="password"
                                                    onChange={(e) => setValue('password', get(e, 'target.value', ''))}
                                                    autoComplete="off"
                                                    value={get(values, 'password', '')}
                                                />
                                            </div>
                                        </div>

                                        <div className={classes.row}>
                                            <div className="col">
                                                <TextInput
                                                    label="Confirm Password"
                                                    icon={LockAlt}
                                                    type="password"
                                                    disabled={!has(values, 'password')}
                                                    onChange={(e) => setValue('confirmPassword', get(e, 'target.value', ''))}
                                                    error={get(errors, 'confirmPassword', '')}
                                                    autoComplete="off"
                                                    value={get(values, 'confirmPassword', '')}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {disabled
                                        ? (
                                            <button
                                                className={classnames(
                                                    'btn',
                                                    'btn-primary',
                                                    'text-uppercase',
                                                )}
                                                disabled
                                            >
                                                Submit
                                            </button>
                                        )
                                        : (
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
        )
        : <Redirect to="/" />;
};

ResetPassword.defaultProps = {
    title: 'Password Reset',
    description: "Forgot your password? We've got you covered!",
};

ResetPassword.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default ResetPassword;
