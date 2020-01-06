import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import { get, has } from 'lodash'
import { Loader } from '@christfellowshipchurch/web-ui-kit'
import { faEnvelope, faMobile } from '@fortawesome/fontawesome-pro-light'
import { faCalendarAlt, faHomeLg, faUser } from '@fortawesome/pro-light-svg-icons'

import { TextInput, Checkbox, Dropdown, Radio, Button } from '../ui'
import { useForm } from '../hooks'
import { useAuth } from '../auth'
import { CampusSelect, StateSelect, EthnicitySelect } from './profileSelectors'
import { GET_CURRENT_PERSON } from './queries'
import { UPDATE_PROFILE } from './mutations'

const EditCurrentProfile = (
    identity,
    update
) => {
    const {
        values,
        errors,
        submitting,
        setValue,
        setSubmitting,
        setError
    } = useForm()
    const { setToken } = useAuth()
    const [updateProfile] = useMutation(UPDATE_PROFILE)

    const onClick = () => {
        setSubmitting(true)
        updateProfile({
            variables: {
                gender: get(values, 'gender', 'Unknown')
            },
            update: (cache, { data: { relateUserLoginToPerson: { token } } }) => {
                setToken(token)
                setSubmitting(false)
                update()
            },
            onError: () => {
                setError('general', 'There was an issue with your submission. Please refresh the page and try again.')
                setSubmitting(false)
                console.log('error')
            },
        })
    }

    return (
        <div className="container my-4 w-50">
            <div className="row">
                <div
                    className={classnames(
                        'col-6',
                        'text-left',
                        'pr-4'
                    )}
                >
                    <h4 className='mt-6'>
                        My Campus
                        </h4>
                    <CampusSelect />
                    <br />
                    <br />
                    <h4>
                        Home Address
                    </h4>
                    <TextInput
                        icon={faHomeLg}
                        label='Street Address'
                    />
                    <br />
                    <TextInput
                        label='Apt #'
                        hideIcon
                    />
                    <br />
                    <TextInput
                        label='City'
                    />
                    <br />
                    <StateSelect />
                    <br />
                    <TextInput
                        label='Zipcode'
                    />
                    <br />
                    <h4>
                        Gender
                        </h4>
                    <Radio
                        options={['Male', 'Female']}
                        error={has(errors, 'gender') && get(errors, 'gender', '')}
                        onClick={(value) => setValue('gender', value)}
                        disabled={submitting}
                        value={get(values, 'gender', '')}
                    />
                </div>
                <div
                    className={classnames(
                        'col-6',
                        'text-left',
                        'border-left',
                        'pl-4'
                    )}
                >
                    <h4 className='mt-6'>
                        Communication Preferences
                    </h4>
                </div>
            </div>
        </div>
    )
}

EditCurrentProfile.defaultProps = {
    update: () => true,
}

EditCurrentProfile.propTypes = {
    update: PropTypes.func,
}

export default EditCurrentProfile
