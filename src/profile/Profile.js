import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import { get, trim } from 'lodash'
import { Loader } from '@christfellowshipchurch/web-ui-kit'
import { faEnvelope, faMobile } from '@fortawesome/fontawesome-pro-light'

import { TextInput, Checkbox } from '../ui'
import { useAuthQuery } from '../auth'

import { GET_CURRENT_PERSON } from './queries'

const Profile = () => {
    const { loading, error, data } = useAuthQuery(GET_CURRENT_PERSON)

    const colClass = classnames(
        'col-md-6',
        'col-12',
        'text-left',
        'ml-3'
    )

    const headerClass = classnames(
        'mb-3'
    )

    if (error) return <h1 className="text-danger">...oops</h1>

    if (loading) return (
        <div className="w-100 h-100">
            <Loader />
        </div>
    ) 

    return (
        <>         
            <div className="container mt-4 mb-6 max-width-800">
                <div className="row">
                    <div
                        className={classnames(
                            'col-md-6',
                            'col-12',
                            'text-left',
                            'pl-4',
                            'profile-bar'
                        )}
                    >
                        <h4 className={`${headerClass} mt-5`}>
                            My Campus:
                        </h4>
                        <h4 className='font-weight-light mb-5'>
                            {get(data, 'currentUser.profile.campus.name', '')}
                        </h4>
                        <h4 className={headerClass}>
                            Home Address:
                        </h4>
                        <h4 className='font-weight-light'>
                            {get(data, 'currentUser.profile.address.street1', '')}
                        </h4>
                        <h4 className='font-weight-light mb-5'>
                            {`${get(data, 'currentUser.profile.address.city', '')}, `}
                            {`${get(data, 'currentUser.profile.address.state', '')} `}
                            {get(data, 'currentUser.profile.address.postalCode', '').substring(0, 5)}
                        </h4>
                        <h4 className={headerClass}>
                            Date of Birth:
                        </h4>
                        <h4 className='font-weight-light mb-5'>
                            {moment(get(data, 'currentUser.profile.birthDate', '')).format('MM/DD/YYYY')}
                        </h4>
                        <h4 className={headerClass}>
                            Gender:
                        </h4>
                        <h4 className='font-weight-light mb-5'>
                            {get(data, 'currentUser.profile.gender', '')}
                        </h4>
                        <h4 className={headerClass}>
                            Ethnicity:
                        </h4>
                        <h4 className='font-weight-light'>
                            {get(data, 'currentUser.profile.ethnicity', '')}
                        </h4>
                    </div>
                    <div
                        className={classnames(
                            'col-md-6',
                            'col-12',
                            'text-left',
                            'pl-4',
                            'pr-3'
                        )}
                    >
                            <h4 className='mt-5 mb-3'>
                                Communication Preferences
                            </h4>
                            <TextInput
                                icon={ faEnvelope }
                                value={get(data, 'currentUser.profile.email', 'user email')}
                                label='Email'
                                readOnly
                            />

                            <div className='d-flex align-items-center my-4 ml-1'>
                                <Checkbox/>
                                <p className='mb-0 ml-2'>Allow Email Notifications</p>
                            </div>
                            
                            <TextInput
                                icon={ faMobile }
                                value={get(data, 'currentUser.profile.phoneNumber', 'user email')}
                                label='Mobile Phone'
                                readOnly
                            />

                            <div className='d-flex align-items-center my-4 ml-1'>
                                <Checkbox/>
                                <p className='mb-0 ml-2'>Allow Text Notifications</p>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
