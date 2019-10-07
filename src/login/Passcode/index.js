import React from 'react'
import { useMutation } from 'react-apollo'
import { get, has } from 'lodash'
import * as Yup from 'yup'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { faLockAlt } from '@fortawesome/fontawesome-pro-light'

import { useAuth } from '../../auth'

import { AUTHENTICATE_CREDENTIALS, CREATE_NEW_LOGIN } from '../mutations'

import {
    TextInput,
    Button
} from '@christfellowshipchurch/web-ui-kit'

const PasscodeForm = ({
    errors,
    setFieldValue,
    promptText,
    buttonText,
    dislaimerText,
    setSubmitting,
    isSubmitting,
    submitting,
    values,
    inputLabel,
    onUpdate,
    type,
    setErrors
}) => {
    const { setToken } = useAuth()
    const [authenticateCredentials] = useMutation(AUTHENTICATE_CREDENTIALS)
    const [createNewLogin] = useMutation(CREATE_NEW_LOGIN)

    const onClick = () => {
        setSubmitting(true)
        const { identity, passcode, isExistingIdentity } = values

        // isExisitingIdentity checks for an existing Sms login
        // password logins aren't known to be existing or not until the authentication is run
        if (isExistingIdentity) {
            authenticateCredentials({
                variables: { identity, passcode },
                update: (cache, { data: { authenticateCredentials: { token } } }) => {
                    setToken(token)
                    setSubmitting(false)
                },
                onError: () => {
                    // the code or password entered was for an existing user login and was incorrect
                    const errorLanguage = {
                        sms: 'confirmation code',
                        password: 'password'
                    }

                    setErrors({
                        password: `The ${errorLanguage[type]} you entered is incorrect`
                    })

                    setSubmitting(false)
                }
            })
        } else {
            createNewLogin({
                variables: { identity, passcode },
                update: (cache, { data: { createNewUserLogin: { token } } }) => {
                    setToken(token)
                    setSubmitting(false)
                },
                onError: () => {
                    setErrors({
                        password: "Sorry! We are unable to log you in at this time"
                    })

                    setSubmitting(false)
                }
            })
        }
    }

    const disabled = isSubmitting ||
        (has(errors, 'password') || get(values, 'password', '') === '')
    const inputType = type === 'sms' ? 'numeric' : 'password'

    return (
        <div className="container">
            <div className="row">
                <div className="col my-4 justify-content-center">
                    <h1>
                        {get(values, 'username', 'No Username')}
                    </h1>
                    <p>
                        {promptText[type]}
                    </p>
                </div>
            </div>
            <div className="row my-4 justify-content-center">
                <div className="col-8">
                    <TextInput
                        icon={faLockAlt}
                        type={inputType}
                        error={has(errors, 'passcode') && get(values, 'passcode', '')}
                        label={inputLabel[type]}
                        onChange={(e) => setFieldValue('password', get(e, 'target.value', ''))}
                    />
                </div>
            </div>
            <div className="row my-4 justify-content-center">
                <div className="col text-center">
                    <Button
                        title={buttonText}
                        disabled={disabled}
                        onClick={onClick}
                    />
                </div>
            </div>
        </div>
    )
}

PasscodeForm.defaultProps = {
    titleText: {
        sms: 'Confirmation Code',
        password: 'Password'
    },
    promptText:
    {
        sms: "Enter in the Confirmation Code that was texted to your mobile phone number.",
        password: "Enter in your existing password or create your password below."
    },
    buttonText: 'Submit',
    inputLabel: {
        sms: "Confirmation Code",
        password: "Password"
    },
    type: 'sms'
}

PasscodeForm.propTypes = {
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
    buttonText: PropTypes.string
}

const WithFormik = ({
    update,
    identity,
    isExistingIdentity
}) => <Formik
        initialValues={{
            identity,
            isExistingIdentity,
        }}
        validationSchema={Yup.object().shape({
            identity: Yup.string().required(),
            passcode: Yup.string().required(),
            passcode: Yup.boolean(),
        })}
        render={props => <PasscodeForm {...props} update={update} />}

    />

export default WithFormik