import React from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import moment from 'moment'

import classnames from 'classnames'
import { useMutation } from 'react-apollo'
import { get, has } from 'lodash'
import { Loader } from '@christfellowshipchurch/web-ui-kit'
import { faEnvelope, faMobile } from '@fortawesome/fontawesome-pro-light'
import { faCalendarAlt, faHomeLg, faUser } from '@fortawesome/pro-light-svg-icons'

import { TextInput, Checkbox, Dropdown, Radio, Button } from '../../ui'
import { CampusSelect, StateSelect, EthnicitySelect } from '../profileSelectors'

import { GET_STATES } from '../queries'

const EditUserProfile = ({
    genderList,
    navigation,
    onChange,
    street1,
    city,
    state,
    postalCode,
    birthDate,
    gender,
    campus,
    isLoading,
}) => {
    const {
        loading: loadingStates,
        data: {
            getStatesList: {
                values: states = []
            } = {}
        } = {},
    } = useQuery(GET_STATES)
    const disabled = isLoading || loadingStates

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
                    <h4>
                        Home Address
                    </h4>
                    <TextInput
                        className={classnames(
                            'my-3'
                        )}
                        icon={faHomeLg}
                        label="Street Address"
                        value={street1}
                        onChangeText={(text) => onChange('street1', text)}
                    />
                    <TextInput
                        label='Apt #'
                        hideIcon
                    />
                    <TextInput
                        label="City"
                        value={city}
                        onChangeText={(text) => onChange('city', text)}
                        hideIcon
                    />
                    <StateSelect />
                    <TextInput
                        label="Zip Code"
                        value={postalCode.substring(0, 5)}
                        onChangeText={(text) => onChange('postalCode', text)}
                        hideIcon
                    />
                    <h4>
                        Gender
                        </h4>
                    <Radio
                        options={['Male', 'Female']}
                        // onClick={}
                        // disabled={}
                        // value={}
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

EditUserProfile.defaultProps = {
    states: [],
    genderList: ['Male', 'Female'],
    onUpdate: () => true,
    street1: '',
    street2: '',
    city: '',
    state: '',
    postalCode: '',
    birthDate: '',
    gender: '',
    campus: '',
    isLoading: false
}

EditUserProfile.propTypes = {
    states: PropTypes.array,
    genderList: PropTypes.arrayOf(PropTypes.string),
    onUpdate: PropTypes.func,
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    birthDate: PropTypes.string,
    gender: PropTypes.string,
    campus: PropTypes.string,
    isLoading: PropTypes.bool
}

export default EditUserProfile
