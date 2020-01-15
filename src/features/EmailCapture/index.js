import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import classnames from 'classnames'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { get, has } from 'lodash'

import { faEnvelope } from '@fortawesome/fontawesome-pro-light'
import {
    TextInput,
    Button
} from '../../ui'

import { SUBMIT_EMAIL_CAPTURE } from './mutations'

const checkEmptyString = (obj, key) => get(obj, key, '') === ''

const EmailCapture = ({
    errors,
    setFieldValue,
    values,
    onSubmit,
    setSubmitting,
    isSubmitting
}) => {
    const [submitEmailCapture, {
        data,
        loading: mutationLoading,
        error: mutationError
    }] = useMutation(SUBMIT_EMAIL_CAPTURE)
    const isLoading = mutationLoading
    const hasError = has(errors, 'firstName')
        || has(errors, 'lastName')
        || has(errors, 'email')
        || checkEmptyString(values, 'firstName')
        || checkEmptyString(values, 'lastName')
        || checkEmptyString(values, 'email')

    if (get(data, 'submitEmailCapture') == "Completed") {
        return (
            <div className="container">
                <div className="row">
                    <div className="col py-3 text-center text-success">
                        <h1>
                            <i className="fal fa-check-circle"></i>
                        </h1>
                        <h3>
                            You're all set! Check your email soon.
                        </h3>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-n3">
            <div className="row">
                <div className="col py-1">
                    <TextInput
                        label="First Name"
                        onChange={(e) => setFieldValue('firstName', get(e, 'target.value', ''))}
                        disabled={isLoading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col py-1">
                    <TextInput
                        label="Last Name"
                        onChange={(e) => setFieldValue('lastName', get(e, 'target.value', ''))}
                        disabled={isLoading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col py-1">
                    <TextInput
                        label="Email Address"
                        icon={faEnvelope}
                        onChange={(e) => setFieldValue('email', get(e, 'target.value', ''))}
                        error={has(values, 'email') && has(errors, 'email') ? get(errors, 'email', null) : null}
                        disabled={isLoading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col py-3">
                    <Button
                        title={`Send this to me`}
                        disabled={hasError || isSubmitting}
                        loading={isLoading}
                        onClick={() => {
                            submitEmailCapture({ variables: values })
                            setSubmitting(true)
                        }}
                    />
                </div>
            </div>
            {mutationError || get(data, 'submitEmailCapture', 'Completed') !== 'Completed' &&
                <div className="row">
                    <div className="col py-3">
                        <i className="text-danger">
                            There was an error submitting your form. Please try again.
                        </i>
                    </div>
                </div>
            }
        </div>
    )
}

const EmailCaptureForm = withFormik({
    mapPropsToValues: () => ({
        firstName: '',
        lastName: '',
        email: ''
    }),
    validationSchema: Yup.object().shape({
        firstName: Yup.string()
            .required(''),
        lastName: Yup.string()
            .required(''),
        email: Yup.string()
            .email('Please make sure you entered a valid email address')
            .required('')
    })
})(EmailCapture)

export default EmailCaptureForm