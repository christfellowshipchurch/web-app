import React from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from 'react-apollo'
import classnames from 'classnames'
import { get, keys, upperFirst, indexOf } from 'lodash'
import { faEnvelope, faMobile } from '@fortawesome/fontawesome-pro-light'
import { faHomeLg } from '@fortawesome/pro-light-svg-icons'

import { useForm } from '../../hooks'
import { TextInput, Checkbox, Radio, Dropdown, Loader } from '../../ui'
import { useAuthQuery } from '../../auth'

import ProfileBanner from '../ProfileBanner'
import { GET_CURRENT_PERSON, GET_STATES, GET_CAMPUSES, GET_CURRENT_CAMPUS } from '../queries'
import { UPDATE_CURRENT_USER, UPDATE_CAMPUS } from '../mutations'


const EditUserProfile = ({
    campus: {
        id,
        name
    },
    address: { 
        street1, 
        street2, 
        city, 
        state, 
        postalCode 
    } = {},
    gender,
    genderList,
    onChange,
}) => {

    //Form for address and profile fields
    const {
        values,
        setValue,
    } = useForm({
        defaultValues: {
            street1,
            street2,
            city,
            state,
            postalCode,
            gender
        }
    })

    //separate Form for Campus mutation
    const {
        values: campusValues,
        setValue: setCampus,
    } = useForm({
        defaultValues: {
            id,
            name
        }
    })

    const [updateProfile, { loading, error }] = useMutation(
        UPDATE_CURRENT_USER,
        {
            update: async (cache, { data: { updateProfileFields, updateAddress } }) => {
                // read the GET_CURRENT_PERSON query
                console.log({ updateAddress })
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
                                address: updateAddress
                            }
                        }
                    },
                })
            }
        }
    )

    const [updateCampus] = useMutation(UPDATE_CAMPUS)

    //Query to prefill profile textboxes
    const { data } = useAuthQuery(GET_CURRENT_PERSON)
    const person = get(data, 'currentUser.profile', '')
    //Queries for dropdown selectors
    const { data: stateSelection } = useQuery(GET_STATES, { fetchPolicy: "cache-and-network" })
    const { data: campusSelection } = useQuery(GET_CAMPUSES, { fetchPolicy: "cache-and-network" })
    
    if (loading) return <Loader/>

    return (
        <>
        <ProfileBanner 
            editMode
            onCancel={() => onChange(false)}
            onSave={() => {
                //Update address and profile fields
                const address = {
                    street1: String(get(values, 'street1', '')),
                    street2: get(values, 'street2', ''),
                    city: get(values, 'city', ''),
                    state: get(values, 'state', ''),
                    postalCode: get(values, 'postalCode', ''),
                }
                const valueKeys = keys(values).filter(
                    (n) => !keys(address).includes(n)
                )
                const profileFields = valueKeys.map((n) => ({
                    field: upperFirst(n),
                    value: values[n],
                }))
                updateProfile({ variables: { address, profileFields } })

                //Update campus
                const campusId = get(campusValues, 'id', '')
                updateCampus({ variables: { campusId } })
                setTimeout( function() {onChange(false)}, 1000)
            }}
        />
        <div 
            className="container my-4 w-50"    
        >
            <div className="row">
                <div
                    className={classnames(
                        'col-6',
                        'text-left',
                        'pr-4'
                    )}
                >
                    <h4 className='mt-6 mb-3'>
                        My Campus
                    </h4>
                    <div>
                        <Dropdown
                            options={get(campusSelection, 'campuses', [])
                                    .map(({id}) => id)}
                            onChange={(e) => {
                                //setting the id of the campus to be the same as campus name being selected from the dropdown
                                setCampus('id', e.target.value)
                                const n = indexOf(get(campusSelection, 'campuses', []), e.target.value)
                                console.log(n, e.target.value)
                            }}
                        />
                    </div>
                   
                    <h4 className='mt-4 mb-2'>
                        Home Address
                    </h4>
                    <div className='mb-3'>
                        <TextInput
                            icon={faHomeLg}
                            label="Street Address"
                            value={get(person, 'address.street1', '')}
                            onChange={(e) => setValue('street1', e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextInput
                            label='Apt #'
                            hideIcon
                        />
                    </div>
                    <div className='mb-3'>
                        <TextInput
                            label="City"
                            value={get(person, 'address.city', '')}
                            onChange={(e) => setValue('city', e.target.value)}
                            hideIcon
                        />
                    </div>
                    <div className='mb-3'>
                        <Dropdown
                                options={get(stateSelection, 'getStatesList.values', [])
                                        .map(({value}) => value)}
                                onChange={(e) => {
                                    setValue('state', e.target.value)
                                }}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextInput
                            label="Zip Code"
                            value={get(person, 'address.postalCode', '').substring(0, 5)}
                            onChange={(e) => setValue('postalCode', e.target.value)}
                            hideIcon
                        />
                    </div>
                    
                    <h4>
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
                        'col-6',
                        'text-left',
                        'border-left',
                        'pl-4'
                    )}
                >
                    <h4 className='mt-6'>
                        Communication Preferences
                    </h4>
                    <TextInput
                        icon={faEnvelope}
                        value={get(person, 'email', '')}
                        readOnly
                        label='Email'
                    />

                    <div className='d-flex align-items-center mb-5 mt-2 ml-1'>
                        <Checkbox
                            checked={
                                get(person, 'communicationPreferences.allowEmail', false)
                            }
                        />
                        <p className='mb-0 ml-2'>Allow Email Notifications</p>
                    </div>

                    <TextInput
                        icon={faMobile}
                        value={get(person, 'phoneNumber', '')}
                        readOnly
                        label='Mobile Phone'
                    />

                    <div className='d-flex align-items-center mb-4 mt-2 ml-1'>
                        <Checkbox
                            checked={
                                get(person, 'communicationPreferences.allowSMS', false)
                            }
                        />
                        <p className='mb-0 ml-2'>
                            Allow Text Notifications
                        </p>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
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
    campus: '',
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
    campus: PropTypes.string,
}

export default EditUserProfile
