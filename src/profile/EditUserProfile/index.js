import React from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from 'react-apollo'
import classnames from 'classnames'
import { get, has } from 'lodash'
import { Envelope, Mobile, CalendarAlt, Church, Home } from '../../ui/Icons'
import AwesomePhoneNumber from 'awesome-phonenumber'
import { string } from 'yup'
import moment from 'moment'

import { useForm } from '../../hooks'
import { TextInput, Checkbox, Radio, Dropdown, Loader } from '../../ui'
import { useAuthQuery } from '../../auth'

import ProfileBanner from '../ProfileBanner'
import { GET_CURRENT_PERSON, GET_STATES, GET_CAMPUSES } from '../queries'
import { UPDATE_CURRENT_USER } from '../mutations'

const CampusSelection = ({ onChange, value }) => {
    const { data, loading, error } = useQuery(GET_CAMPUSES, { fetchPolicy: "cache-and-network" })
    const disabled = loading || error

    return <Dropdown
        options={get(data, 'campuses', [])
            .map(({ id, name }) => ({ value: id, label: name }))}
        onChange={(e) => onChange(e)}
        disabled={disabled}
        value={disabled ? '' : value}
        icon={Church}
    />
}

const StateSelection = ({ onChange, value }) => {
    const { data, loading, error } = useQuery(GET_STATES, { fetchPolicy: "cache-and-network" })
    const disabled = loading || error

    return <Dropdown
        options={get(data, 'getStatesList.values', [])
            .map(({ value }) => value)}
        onChange={(e) => onChange(e)}
        disabled={disabled}
        value={disabled ? '' : value}
        hideIcon
    />
}

const validateBirthDate = (birthDate) => 
    !!birthDate && moment().diff(moment(birthDate), 'years') >= 13

const validation = {
    birthDate: (value) => value && validateBirthDate(value)
        ? false
        : 'You must be at least 13 years old to create an account'
}


const EditUserProfile = ({
    campus: {
        id: campusId,
        name
    } = {},
    address: {
        street1,
        street2,
        city,
        state,
        postalCode
    } = {},
    communicationPreferences: {
        allowSMS,
        allowEmail,
    } = {},
    email,
    phoneNumber,
    gender,
    birthDate,
    genderList,
    onChange,
}) => {
    // Form for address and profile fields
    const {
        values,
        setValue,
        errors,
        setError
    } = useForm({
        validation,
        defaultValues: {
            street1,
            street2,
            city,
            state,
            postalCode,
            birthDate,
            gender,
            campus: campusId,
            allowSMS,
            allowEmail,
            email,
            phoneNumber,
        }
    })

    const [updateProfile, { loading, error }] = useMutation(
        UPDATE_CURRENT_USER,
        {
            update: async (cache, { data: { updateProfileFields, updateAddress, updateUserCampus } }) => {
                // read the GET_CURRENT_PERSON query
                const { currentUser } = cache.readQuery({ query: GET_CURRENT_PERSON })
                const { gender } = updateProfileFields
                // write to the cache the results of the current cache
                //  and append any new fields that have been returned from the mutation
                await cache.writeQuery({
                    query: GET_CURRENT_PERSON,
                    data: {
                        currentUser: {
                            ...currentUser,
                            profile: {
                                ...currentUser.profile,
                                gender,
                                birthDate,
                                address: updateAddress,
                                campus: updateUserCampus.campus
                            }
                        }
                    },
                })

                onChange()
            }
        }
    )

    if (loading) return <Loader />

    return [
        <ProfileBanner
            key={`EditUserProfile:ProfileHeader`}
            editMode
            onCancel={onChange}
            onSave={async () => {
                const phoneNumberInput = get(values, 'phoneNumber', '')
                const phoneNumber = new AwesomePhoneNumber(phoneNumberInput, 'US')
                const birthDate = get(values, 'birthDate', '')
                const email = get(values, 'email', '')
                const birthDateIsValid = validateBirthDate(birthDate)

                if (phoneNumber.isValid() && birthDateIsValid && await string().email().isValid(email)) {
                    updateProfile({
                        variables: {
                            address: {
                                street1: get(values, 'street1', ''),
                                street2: get(values, 'street2', ''),
                                city: get(values, 'city', ''),
                                state: get(values, 'state', ''),
                                postalCode: get(values, 'postalCode', ''),
                            },
                            profileFields: [
                                { field: 'Gender', value: get(values, 'gender', '') },
                                { field: 'BirthDate', value: get(values, 'birthDate', '') },
                                { field: 'PhoneNumber', value: phoneNumber.getNumber('significant').replace(/[^0-9]/gi, '') },
                                { field: 'Email', value: email },
                            ],
                            campusId: get(values, 'campus', ''),
                            communicationPreferences: [
                                { type: 'SMS', allow: get(values, 'allowSMS', '') },
                                { type: 'Email', allow: get(values, 'allowEmail', '') },
                            ]
                        }
                    })
                }

                if (!phoneNumber.isValid()) setError('phoneNumber', 'Please enter a valid phone number')
                if (!birthDateIsValid) setError('birthDate', 'Please enter a valid birth date, must be older than 13 years old.')
                if (!await string().email().isValid(email)) setError('email', 'Please enter a valid email address')
            }}
        />,
        <div
            key={`EditUserProfile:ProfileFields`}
            className="container my-4"
        >
            <div className="row">
                <div
                    className={classnames(
                        'col-md-6',
                        'col-12',
                        'text-left',
                        'px-4',
                        'profile-bar'
                    )}
                >
                    <h4 className='mt-4 mb-3'>
                        My Campus
                    </h4>
                    <CampusSelection
                        value={get(values, 'campus', '')}
                        onChange={(e) => setValue('campus', e.target.value)}
                    />

                    <h4 className='mt-5 mb-2'>
                        Home Address
                    </h4>
                    <div className='mb-3'>
                        <TextInput
                            icon={Home}
                            label="Street Address"
                            value={get(values, 'street1', '')}
                            onChange={(e) => setValue('street1', e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextInput
                            label="City"
                            value={get(values, 'city', '')}
                            onChange={(e) => setValue('city', e.target.value)}
                            hideIcon
                        />
                    </div>
                    <div className='mb-3'>
                        <StateSelection
                            label="State"
                            value={get(values, 'state', '')}
                            onChange={(e) => setValue('state', e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextInput
                            label="Zip Code"
                            value={get(values, 'postalCode', '').substring(0, 5)}
                            onChange={(e) => setValue('postalCode', e.target.value)}
                            hideIcon
                        />
                    </div>
                    
                    <h4 className='mt-5'>
                        Birthday
                    </h4>
                    <div>
                            <TextInput
                                type="date"
                                error={get(errors, 'birthDate', null)}
                                onChange={(e) => {
                                    setValue('birthDate', moment(get(e, 'target.value', '')).toISOString())
                                }}
                                label='Select Date'
                                value={moment(get(values, 'birthDate', '')).format('YYYY-MM-DD')}
                                icon={CalendarAlt}
                            />
                    </div>

                    <h4 className='mt-5'>
                        Gender
                    </h4>
                    <Radio
                        options={genderList}
                        onClick={(value) => setValue('gender', value)}
                        value={get(values, 'gender', '')}
                    />
                </div>
                <div
                    className={classnames(
                        'col-md-6',
                        'col-12',
                        'text-left',
                        'px-4',
                    )}
                >
                    <h4 className='mt-4'>
                        Communication Preferences
                    </h4>
                    <TextInput
                        icon={Envelope}
                        value={get(values, 'email', '')}
                        label='Email'
                        error={get(errors, 'email', null)}
                        onChange={(e) => setValue('email', e.target.value)}
                    />

                    <div className='d-flex align-items-center mb-5 mt-2 ml-1'>
                        <Checkbox
                            onClick={() => setValue('allowEmail', !get(values, 'allowEmail', true))}
                            checked={get(values, 'allowEmail', false)}
                        />
                        <p className='mb-0 ml-2'>Allow Email Notifications</p>
                    </div>

                    <TextInput
                        icon={Mobile}
                        value={get(values, 'phoneNumber', '')}
                        label='Mobile Phone'
                        error={get(errors, 'phoneNumber', null)}
                        onChange={(e) => setValue('phoneNumber', e.target.value)}
                    />

                    <div className='d-flex align-items-center mb-4 mt-2 ml-1'>
                        <Checkbox
                            onClick={() => setValue('allowSMS', !get(values, 'allowSMS', true))}
                            checked={get(values, 'allowSMS', false)}
                        />
                        <p className='mb-0 ml-2'>
                            Allow Text Notifications
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ]
}

EditUserProfile.defaultProps = {
    states: [],
    genderList: ['Male', 'Female'],
    onChange: () => true,
    street1: '',
    street2: '',
    city: '',
    state: '',
    postalCode: '',
    birthDate: '',
    gender: '',
    campus: {
        id: ''
    },
}

EditUserProfile.propTypes = {
    states: PropTypes.array,
    genderList: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    birthDate: PropTypes.string,
    gender: PropTypes.string,
    campus: PropTypes.shape({
        id: PropTypes.string
    }),
}

export default ({ onChange }) => {
    const { data, loading } = useAuthQuery(GET_CURRENT_PERSON, { fetchPolicy: "cache-and-network" })
    const person = get(data, 'currentUser.profile', {})

    return loading
        ? <Loader />
        : <EditUserProfile
            {...person}
            onChange={onChange}
        />
}
