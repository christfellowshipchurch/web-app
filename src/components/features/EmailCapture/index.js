import React, { useState } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { get, has } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/fontawesome-pro-light'
import { faJedi } from '@fortawesome/free-solid-svg-icons'
import { TextInput, Button } from '@christfellowshipchurch/web-ui-kit'
import classnames from 'classnames'

const Overlay = ({ onClick }) => (
    <div
        className={classnames(
            "w-100",
            "h-100",
            "d-flex",
            "justify-content-center",
            "align-items-center",
            'p-5'
        )}
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            left: 0
        }}>
        <div className="card text-success border-success text-center">
            <div className="card-body">
                <FontAwesomeIcon icon={faJedi} color='light-gray' size="3x" />
                <h1 className="card-title">
                    For my ally is the Force, and a powerful ally it is.
                </h1>
            </div>
            <div className="card-footer text-right">
                <Button type="link" onClick={onClick} title="Close" />
            </div>
        </div>

    </div>
)

const checkEmptyString = (obj, key) => get(obj, key, '') === ''

const EmailCapture = ({
    errors,
    setFieldValue,
    values,
    onSubmit
}) => {
    const [showOverlow, setShowOverlay] = useState(false)
    const hasError = has(errors, 'firstName')
        || has(errors, 'lastName')
        || has(errors, 'email')
        || checkEmptyString(values, 'firstName')
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
                        icon={faEnvelope}
                        onChange={(e) => setFieldValue('email', get(e, 'target.value', ''))}
                        error={has(values, 'email') && has(errors, 'email') ? get(errors, 'email', null) : null}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col py-3">
                    <Button
                        title={`Send this to me`}
                        disabled={hasError}
                        onClick={() => setShowOverlay(true)} />
                </div>
            </div>
            {showOverlow && <Overlay onClick={() => setShowOverlay(false)} />}
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