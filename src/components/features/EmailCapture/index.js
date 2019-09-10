import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { get, has } from 'lodash'
import { TextInput, Button } from '@christfellowshipchurch/web-ui-kit'

const checkEmptyString = (obj, key) => get(obj, key, '') === ''

const EmailCapture = ({
    errors,
    setFieldValue,
    values,
    onSubmit
}) => {
    const hasError = has(errors, 'fistName')
        || has(errors, 'lastName')
        || has(errors, 'email')
        || checkEmptyString(values, 'fistName')
        || checkEmptyString(values, 'lastName')
        || checkEmptyString(values, 'email')

    return (
        <div className="container">
            <div className="row">
                <div className="col py-3">
                    <TextInput
                        label="First Name"
                        onChange={(e) => setFieldValue('firstName', get(e, 'target.value', ''))}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col py-3">
                    <TextInput
                        label="Last Name"
                        onChange={(e) => setFieldValue('lastName', get(e, 'target.value', ''))}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col py-3">
                    <TextInput
                        label="Email Address"
                        onChange={(e) => setFieldValue('email', get(e, 'target.value', ''))}
                        error={has(values, 'email') && has(errors, 'email') ? get(errors, 'email', null) : null}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col py-3">
                    <Button title={hasError ? 'Disabled' : `Send this to me`} />
                </div>
            </div>
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