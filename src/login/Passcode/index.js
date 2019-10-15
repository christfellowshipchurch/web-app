import React from 'react'
import { useMutation } from 'react-apollo'
import { get, has } from 'lodash'
import * as Yup from 'yup'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { faLockAlt } from '@fortawesome/fontawesome-pro-light'

import { useAuth } from '../../auth'
import { useForm } from '../../hooks'

import { AUTHENTICATE_CREDENTIALS, CREATE_NEW_LOGIN } from '../mutations'

import {
    TextInput,
    Button
} from '@christfellowshipchurch/web-ui-kit'

import { RequestEmailPin } from '../Reset'
import ResendSMS from '../ResendSMS'

const PasscodeForm = ({
    identity,
    isExistingIdentity,
    promptText,
    buttonText,
    inputLabel,
    type,
    update,
}) => {
    const {
        values,
        errors,
        submitting,
        setValue,
        setSubmitting,
        setError
    } = useForm()
    const { setToken } = useAuth()
    const [authenticateCredentials] = useMutation(AUTHENTICATE_CREDENTIALS)
    const [createNewLogin] = useMutation(CREATE_NEW_LOGIN)

    const onClick = () => {
        setSubmitting(true)
        const { passcode } = values

        // isExisitingIdentity checks for an existing Sms login
        // password logins aren't known to be existing or not until the authentication is run
        if (isExistingIdentity) {
            authenticateCredentials({
                variables: { identity, passcode },
                update: (cache, { data: { authenticateCredentials: { token } } }) => {
                    setToken(token)
                    setSubmitting(false)
                    update({
                        identity,
                        passcode: get(values, 'passcode', ''),
                        isExistingIdentity
                    })
                },
                onError: () => {
                    // the code or password entered was for an existing user login and was incorrect
                    const errorLanguage = {
                        sms: 'confirmation code',
                        password: 'password'
                    }

                    setError('passcode', `The ${errorLanguage[type]} you entered is incorrect`)

                    setSubmitting(false)
                }
            })
        } else {
            createNewLogin({
                variables: { identity, passcode },
                update: (cache, { data: { createNewUserLogin: { token } } }) => {
                    setSubmitting(false)
                    update({
                        identity,
                        passcode: get(values, 'passcode', ''),
                        isExistingIdentity
                    })
                },
                onError: () => {
                    setError('passcode', 'Sorry! We are unable to log you in at this time')

                    setSubmitting(false)
                }
            })
        }
    }

    const inputType = type === 'sms' ? 'numeric' : 'password'
    const disabled = submitting
        || !!get(errors, 'passcode', false)
        || get(values, 'passcode', '') === ''
        || identity === ''

    console.log({ identity, type, isExistingIdentity })

    return (
        <div className="container">
            <div className="row">
                <div className="col my-4 justify-content-center">
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
                        error={has(errors, 'passcode') && get(errors, 'passcode', '')}
                        label={inputLabel[type]}
                        onChange={(e) => setValue('passcode', get(e, 'target.value', ''))}
                        disabled={submitting}
                    />
                </div>
            </div>

            <div className="row">
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
                    && isExistingIdentity &&
                    <div className="col-12 text-center my-4">
                        <RequestEmailPin
                            email={identity}
                            update={() => update({ requestedEmailPin: true })}
                            onClick={() => setSubmitting(true)}
                        >
                            Forgot your password? We can help with that!
                        </RequestEmailPin>
                            
                {type === 'sms' && identity && identity !== '' &&
                    <div className="col-12 text-center my-4">
                        <ResendSMS phoneNumber={identity}>Didn't get a code? Request a new one.</ResendSMS>
                    </div>
                }
            </div>
        </div >
    )
}

PasscodeForm.defaultProps = {
    identity: '',
    isExistingIdentity: false,
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
    type: 'sms',
    update: () => true,
}

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
}

export default PasscodeForm