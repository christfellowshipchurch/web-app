import React from 'react';
import { useMutation } from 'react-apollo';
import { get, has } from 'lodash';
import * as Yup from 'yup';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Formik } from 'formik';
import { faLockAlt } from '@fortawesome/fontawesome-pro-light';

import {
    TextInput,
    Button,
} from '@christfellowshipchurch/web-ui-kit';
import { useForm } from '../../hooks';
import { useAuth } from '../../auth';

import { REGISTER_WITH_SMS, REGISTER_WITH_EMAIL } from '../mutations';

import {
    Radio,
} from '../../ui';

const validation = {
    firstName: (value) => (value && value !== ''
        ? false
        : 'Please enter your first name'),
    lastName: (value) => (value && value !== ''
        ? false
        : 'Please enter your last name'),
    birthDate: (value) => (value && moment().diff(moment(value), 'years') >= 13
        ? false
        : 'You must be at least 13 years old to create an account'),
};

const ProfileInformationForm = ({
    identity,
    passcode,
    type,
    promptText,
    buttonText,
    defaultDate,
    genderList,
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
    } = useForm({
        validation,
        defaultValues: {
            birthDate: defaultDate,
        },
    });
    const { setToken } = useAuth();
    const [registerWithSms] = useMutation(REGISTER_WITH_SMS);
    const [registerWithEmail] = useMutation(REGISTER_WITH_EMAIL);
    const birthDate = moment(get(values, 'birthDate', defaultDate)).format('YYYY-MM-DD');
    const onRegister = ({ token }) => {
        setToken(token);
        setSubmitting(false);
        update();
    };
    const onError = () => {
        setError('general', 'There was an issue with your submission. Please refresh the page and try again.');
        setSubmitting(false);
    };

    const disabled = submitting
        || !!get(errors, 'firstName', true)
        || !!get(errors, 'lastName', true)
        || !!get(errors, 'birthDate', true);

    const onClick = () => {
        setSubmitting(true);
        if (identity && passcode) {
            const variables = {
                identity,
                password: passcode,
                userProfile: [
                    { field: 'FirstName', value: get(values, 'firstName') },
                    { field: 'LastName', value: get(values, 'lastName') },
                    { field: 'BirthDate', value: get(values, 'birthDate') },
                    { field: 'Gender', value: get(values, 'gender', 'Unknown') },
                ],
            };
            if (type === 'sms') {
                // TODO : test
                registerWithSms({
                    variables,
                    update: (cache, { data: { registerWithSms: { token } } }) => {
                        onRegister({ token });
                    },
                    onError,
                });
            } else if (type === 'email') {
                // TODO : test
                registerWithEmail({
                    variables,
                    update: (cache, { data: { registerPerson: { token } } }) => {
                        onRegister({ token });
                    },
                    onError,
                });
            }
        } else {
            setError('general', 'There was an issue with your submission. Please refresh the page and try again.');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col my-2 justify-content-center text-center">
                    <p className="text-center p-0 mb-0">
                        {promptText}
                    </p>
                    {has(errors, 'general')
                        && (
                            <i className="text-danger">
                                {get(errors, 'general', 'An error occured. Please try again.')}
                            </i>
                        )}
                </div>
            </div>

            <div className="row my-3 justify-content-center">
                <div className={classnames(columns)}>
                    <TextInput
                        error={has(errors, 'firstName') && get(errors, 'firstName', '')}
                        label="First Name*"
                        onChange={(e) => setValue('firstName', get(e, 'target.value', ''))}
                        disabled={submitting}
                        value={get(values, 'firstName', '')}
                    />
                </div>
            </div>

            <div className="row my-3 justify-content-center">
                <div className={classnames(columns)}>
                    <TextInput
                        error={has(errors, 'lastName') && get(errors, 'lastName', '')}
                        label="Last Name*"
                        onChange={(e) => setValue('lastName', get(e, 'target.value', ''))}
                        disabled={submitting}
                        value={get(values, 'lastName', '')}
                    />
                </div>
            </div>

            <div className="row my-3 justify-content-center">
                <div className={classnames(columns)}>
                    <TextInput
                        type="date"
                        error={has(errors, 'birthDate') && get(errors, 'birthDate', '')}
                        label="Birth Date*"
                        onChange={(e) => setValue('birthDate', moment(get(e, 'target.value', '')).toISOString())}
                        disabled={submitting}
                        value={birthDate}
                    />
                </div>
            </div>

            <div className="row my-3 justify-content-center">
                <div className={classnames(columns)}>
                    <Radio
                        options={genderList}
                        error={has(errors, 'gender') && get(errors, 'gender', '')}
                        label="Gender"
                        onClick={(value) => setValue('gender', value)}
                        disabled={submitting}
                        value={get(values, 'gender', '')}
                    />
                </div>
            </div>

            <div className="my-3 text-center">
                <Button
                    title={buttonText}
                    disabled={disabled}
                    onClick={onClick}
                    loading={submitting}
                />
            </div>
        </div>
    );
};

ProfileInformationForm.defaultProps = {
    genderList: ['Male', 'Female'],
    defaultDate: moment().subtract(13, 'year').toISOString(),
    titleText: "Let's get to know each other better",
    promptText: "In order for us to get you the blah blah blah. So let's go ahead and bleedidy doopody dee",
    buttonText: 'Finish',
    update: () => true,
    columns: 'col',
};

ProfileInformationForm.propTypes = {
    genderList: PropTypes.arrayOf(PropTypes.string),
    defaultDate: PropTypes.string,
    titleText: PropTypes.string,
    propmtText: PropTypes.string,
    buttonText: PropTypes.string,
    update: PropTypes.func,
    columns: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
};

export default ProfileInformationForm;
