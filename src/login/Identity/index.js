import React, { useState } from 'react'
import { useMutation, useLazyQuery } from 'react-apollo'
import { get, has, keys } from 'lodash'
import * as Yup from 'yup'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Formik } from 'formik'
import { useForm } from '../../hooks'
import { parseUsername } from '../utils'

import { IS_VALID_IDENTITY, REQUEST_PIN } from '../mutations'

import {
    Checkbox
} from '../../ui'
import {
    TextInput,
    Button
} from '@christfellowshipchurch/web-ui-kit'

const validation = {
    identity: async (value) => {
        const schema = Yup.string()
        const isValid = await schema.isValid(value)

        if (isValid && value !== '') {
            const { email, phoneNumber } = await parseUsername(value)

            if (email || phoneNumber) return false
        }

        return 'Please enter a valid phone number or email'
    }
}

const IdentityForm = ({
    promptText,
    buttonText,
    dislaimerText,
    inputLabel,
    update,
    columns
}) => {
    const {
        values,
        errors,
        submitting,
        setValue,
        setSubmitting,
    } = useForm({
        validation,
        defaultValues: {
            privacyPolicyAgreement: false
        }
    })
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
                        update({ type: 'password', success, isExistingIdentity, identity })
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

    const disabled = !!get(errors, 'identity', true)
        || !get(values, 'privacyPolicyAgreement', false)
        || submitting

    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-12">
                    <p className='mb-0 pb-3'>
                        {promptText}
                    </p>
                </div>
            </div>

            <div className="row my-4 justify-content-center">
                <div className={classnames(columns)}>
                    <TextInput
                        label={inputLabel}
                        error={get(errors, 'identity', '')}
                        onChange={(e) => setValue('identity', get(e, 'target.value', ''))}
                        value={get(values, 'identity', '')}
                        disabled={submitting}
                        value={get(values, 'identity', '')}
                    />
                </div>
            </div>

            <div className="row my-4 text-center justify-content-center">
                <div className={classnames(columns)}>
                    <Checkbox
                        error={has(errors, 'privacyPolicyAgreement') && get(errors, 'privacyPolicyAgreement', '')}
                        label={dislaimerText}
                        onClick={() => setValue(
                            'privacyPolicyAgreement',
                            !get(values, 'privacyPolicyAgreement', true)
                        )}
                        checked={get(values, 'privacyPolicyAgreement', false)}
                        disabled={submitting}
                    />
                </div>
            </div>

            <div className="my-4 text-center">
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

IdentityForm.propTypes = {
    titleText: PropTypes.string,
    inputLabel: PropTypes.string,
    promptText: PropTypes.string,
    buttonText: PropTypes.string,
    dislaimerText: PropTypes.string,
    update: PropTypes.func,
    columns: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ])
}

IdentityForm.defaultProps = {
    titleText: 'Welcome Home!',
    inputLabel: "Mobile Number or Email",
    promptText:
        "Get started by entering in either you phone number or email address. We'll never share your information or contact you (unless you ask!).",
    buttonText: 'Agree and Continue',
    dislaimerText: 'I understand and agree to the following policies as laid out by Christ Fellowship Church:',
    update: () => true,
    columns: 'col'
}

export default IdentityForm