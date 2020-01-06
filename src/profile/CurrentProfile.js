import React from 'react'
import classnames from 'classnames'
import moment from 'moment'
import { get, trim } from 'lodash'
import { Loader } from '@christfellowshipchurch/web-ui-kit'
import { faEnvelope, faMobile } from '@fortawesome/fontawesome-pro-light'

import { TextInput, Checkbox } from '../ui'
import { useAuthQuery } from '../auth'

import { GET_CURRENT_PERSON } from './queries'

const CurrentProfile = () => {
    const {
        loading,
        error,
        data: {
            currentUser: {
                profile,
            } = {},
        } = {}
    } = useAuthQuery(GET_CURRENT_PERSON)

    const headerClass = classnames(
        'mb-3',
        'mt-5'
    )

    if (error) return <h1 className="text-danger">...oops</h1>

    const birthDate = get(profile, 'birthDate', '')
    const address = get(profile, 'address', {})

    return [
        <div
            key={`Profile:Fields`}
            className="container mt-4 mb-6"
        >
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
                    <h4 className={headerClass}>
                        My Campus:
                    </h4>
                    <h4 className='font-weight-light mb-5'>
                        {get(profile, 'campus.name', '')}
                    </h4>
                    <h4 className={headerClass}>
                        Home Address:
                    </h4>
                    <h4 className='font-weight-light'>
                        {get(profile, 'address.street1', '')}
                    </h4>
                    <h4 className='font-weight-light mb-5'>
                        {`${get(address, 'city', '')}, ${get(address, 'state', '')} ${get(address, 'postalCode', '').substring(0, 5)}`}
                    </h4>
                    <h4 className={headerClass}>
                        Date of Birth:
                    </h4>
                    <h4 className='font-weight-light mb-5'>
                        {moment(birthDate).isValid() && moment(birthDate).format('MMM DD, YYYY')}
                    </h4>
                    <h4 className={headerClass}>
                        Gender:
                    </h4>
                    <h4 className='font-weight-light mb-5'>
                        {get(profile, 'gender', '')}
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
                        icon={faEnvelope}
                        value={get(profile, 'email', '')}
                        label='Email'
                        readOnly
                    />

                    <div className='d-flex align-items-center mb-5 mt-2 ml-1'>
                        <Checkbox
                            checked={
                                get(profile, 'communicationPreferences.allowEmail', false)
                            }
                            disabled
                        />
                        <p className='mb-0 ml-2'>Allow Email Notifications</p>
                    </div>

                    <TextInput
                        icon={faMobile}
                        value={get(profile, 'phoneNumber', '')}
                        label='Mobile Phone'
                        readOnly
                    />

                    <div className='d-flex align-items-center mb-4 mt-2 ml-1'>
                        <Checkbox
                            checked={
                                get(profile, 'communicationPreferences.allowSMS', false)
                            }
                            disabled
                        />
                        <p className='mb-0 ml-2'>
                            Allow Text Notifications
                        </p>
                    </div>
                </div>
            </div>
        </div>,
        loading && <div
            key={`Profile:Loader`}
            className="absolute-center w-100 h-100"
        >
            <Loader />
        </div>
    ]
}

export default CurrentProfile
