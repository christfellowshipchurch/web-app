import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { get, has } from 'lodash'
import * as Yup from 'yup'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Formik } from 'formik'
import { parseUsername } from '../utils'

import { IS_VALID_IDENTITY, REQUEST_PIN } from '../mutations'

import {
    Checkbox
} from '../../ui'
import {
    TextInput,
    Button
} from '@christfellowshipchurch/web-ui-kit'

const IdentityForm = ({
    errors,
    setFieldValue,
    promptText,
    buttonText,
    dislaimerText,
    setSubmitting,
    submitting,
    values,
    inputLabel,
    update
}) => {
    const [validateIdentity] = useMutation(IS_VALID_IDENTITY)
    const [requestPin] = useMutation(REQUEST_PIN)

    const onClick = async () => {
        setSubmitting(true)
        const identity = get(values, 'identity', '')
        const { email, phoneNumber } = await parseUsername(identity)

        if (email) {
            validateIdentity({
                variables: {
                    identity: identity,
                },
                update: (cache, { data: { isValidIdentity: { success, isExistingIdentity } } }) => {
                    if (success) {
                        // navigate to Passcode validation
                        update({ identity, type: 'password', isExistingIdentity })
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
                    phoneNumber: identity,
                },
                update: (cache, { data: { requestSmsLoginPin: { success, isExistingIdentity } } }) => {
                    if (success) {
                        // navigate to Passcode validation
                        update({ identity, type: 'sms', isExistingIdentity })
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

    const disabled = has(errors, 'identity')
        || get(values, 'identity', '') === ''
        || !get(values, 'privacyPolicyAgreement', false)
        || submitting

    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-12">
                    <p>
                        {promptText}
                    </p>
                </div>
            </div>

            <div className="row my-4 justify-content-center">
                <div className="col-8">
                    <TextInput
                        label={inputLabel}
                        error={has(errors, 'identity') && get(errors, 'identity', '')}
                        onChange={(e) => setFieldValue('identity', get(e, 'target.value', ''))}
                        value={get(values, 'identity', '')}
                    />
                </div>
            </div>

            <div className="row my-5 text-center justify-content-center">
                <div className="col-8">
                    <Checkbox
                        error={has(errors, 'privacyPolicyAgreement') && get(errors, 'privacyPolicyAgreement', '')}
                        label={dislaimerText}
                        onClick={() => setFieldValue(
                            'privacyPolicyAgreement',
                            !get(values, 'privacyPolicyAgreement', true)
                        )}
                        checked={get(values, 'privacyPolicyAgreement', false)}
                    />
                </div>
            </div>

            <div className="text-center">
                <Button
                    onClick={onClick}
                    disabled={disabled}
                    loading={submitting}
                    title={buttonText}
                />
            </div>
        </div>
    )
}

IdentityForm.defaultProps = {
    titleText: 'Welcome Home!',
    inputLabel: "Mobile Number or Email Address",
    promptText:
        "Get started by entering in either you phone number or email address. We'll never share your information or contact you (unless you ask!).",
    buttonText: 'Agree and Continue',
    dislaimerText: 'I understand and agree to the following policies as laid out by Christ Fellowship Church:'
}

const WithFormik = ({ update }) => <Formik
    initialValues={{
        identity: '',
        privacyPolicyAgreement: false,
    }}
    validationSchema={Yup.object().shape({
        identity: Yup.string()
            .test(
                'identity',
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
    })}
    render={props => <IdentityForm {...props} update={update} />}

/>

WithFormik.defaultProps = {
    update: () => true
}

WithFormik.propTypes = {
    update: PropTypes.func
}

export default WithFormik