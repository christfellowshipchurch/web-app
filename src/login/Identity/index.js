import React from 'react'
import { useMutation } from 'react-apollo'
import { get, has } from 'lodash'
import * as Yup from 'yup'
import classnames from 'classnames'
import { withFormik } from 'formik'
import { parseUsername } from '../utils'

import { IS_VALID_IDENTITY, REQUEST_PIN } from '../mutations'

import {
    TextInput,
    Button
} from '@christfellowshipchurch/web-ui-kit'

const IdentityForm = ({
    errors,
    setFieldValue = () => true,
    loginPolicyInfo,
    loginPromptText,
    loginButtonText,
    loginDislaimerText,
    setSubmitting,
    submitting,
    values,
    inputLabel,
    onUpdate
}) => {
    const [validateIdentity] = useMutation(IS_VALID_IDENTITY)
    const [requestPin] = useMutation(REQUEST_PIN)

    const onClick = async () => {
        setSubmitting(true)
        const username = get(values, 'username', '')
        const { email, phoneNumber } = await parseUsername(username)

        if (email) {
            validateIdentity({
                variables: {
                    identity: username,
                },
                update: (cache, { data: { isValidIdentity: { success, isExistingIdentity } } }) => {
                    if (success) {
                        // navigate to Passcode validation
                        onUpdate({ username, type: 'password', isExistingIdentity })
                    } else {
                        // show some error on the screen
                    }

                    setSubmitting(false)
                },
                onError: () => setSubmitting(false)
            })
        } else if (phoneNumber) {
            requestPin({
                variables: {
                    phoneNumber: username,
                },
                update: (cache, { data: { requestSmsLoginPin: { success, isExistingIdentity } } }) => {
                    if (success) {
                        // navigate to Passcode validation
                        onUpdate({ username, type: 'sms', isExistingIdentity })
                    } else {
                        // show some error on the screen
                    }

                    setSubmitting(false)
                },
                onError: () => setSubmitting(false)
            })
        } else {
            setSubmitting(false)
            // error handling
        }
    }

    const disabled = has(errors, 'username')
        || get(values, 'username', '') === ''
        || !get(values, 'privacyPolicyAgreement', false)
        || submitting

    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-12">
                    <p>
                        {loginPromptText}
                    </p>
                </div>
                <div className="col-12">
                    <p>
                        {loginPolicyInfo}
                    </p>
                </div>
            </div>

            <div className="row my-5 justify-content-center">
                <div className="col-6">
                    <TextInput
                        label={inputLabel}
                        error={has(errors, 'username') && get(errors, 'username', '')}
                        onChange={(e) => setFieldValue('username', get(e, 'target.value', ''))}
                        value={get(values, 'username', '')}
                    />
                </div>
            </div>

            <div className="row my-5 text-center justify-content-center">
                <div className="col-1">
                    <input
                        type="checkbox"
                        className={classnames(
                            "border-dark",
                            "bg-transparent",
                            has(errors, 'privacyPolicyAgreement') && get(values, 'privacyPolicyAgreement', '') !== ''
                                ? 'is-invalid'
                                : null
                        )}
                        id="privacyPolicyAgreement"
                        onChange={(e) => setFieldValue('privacyPolicyAgreement', get(e, 'target.checked', false))}
                        checked={get(values, 'privacyPolicyAgreement', false)}
                    />
                </div>
                <div className="col-5 text-left">
                    <label className="form-check-label" htmlFor="privacyPolicyAgreement">
                        {loginDislaimerText} <a href="#">Privacy Policy</a>
                    </label>
                </div>
            </div>

            <div className="text-center">
                <Button
                    onClick={onClick}
                    disabled={disabled}
                    loading={submitting}
                    title={loginButtonText}
                />
            </div>
        </div>
    )
}

IdentityForm.defaultProps = {
    titleText: 'Welcome Home!',
    inputLabel: "Mobile Number or Email Address",
    loginPolicyInfo:
        "We'll never share your information or contact you (unless you ask!).",
    loginPromptText:
        "Get started by entering in either you phone number or email address.",
    loginButtonText: 'Agree and Continue',
    loginDislaimerText: 'I understand and agree to the following policies as laid out by Christ Fellowship Church:'
}

const WithFormik = withFormik({
    mapPropsToValues: () => ({
        username: '',
        privacyPolicyAgreement: false,
    }),
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .test(
                'username',
                'Please enter a valid phone number or email address',
                async (value) => {
                    if (value) {
                        const { email, phoneNumber } = await parseUsername(value)
                        return email || phoneNumber
                    }
                    return false
                }
            ),
        privacyPolicyAgreement: Yup.boolean()
    })
})(IdentityForm)

export default WithFormik