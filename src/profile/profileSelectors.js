import React, { useState } from 'react'
import { Query, Mutation, useQuery, useMutation } from 'react-apollo'
import { get } from 'lodash'
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons'

import { Dropdown, Radio } from '../ui'

import { GET_STATES_LIST, GET_ETHNICITY_LIST, GET_CAMPUSES } from './queries'
import { UDPATE_GENDER, UPDATE_BIRTHDATE, UPDATE_ETHNICITY } from './mutations'


export const CampusSelect = () => {
    const { data } = useQuery(GET_CAMPUSES, { fetchPolicy: "cache-and-network" })
    const values = get(data, 'campuses', [])
    return (
        <Dropdown
            label="Select Location"
            options={values.map(({name}) => name)}
            icon={faCalendarAlt}
        />
    )
}

export const StateSelect = () => {
    const { data } = useQuery(GET_STATES_LIST, { fetchPolicy: "cache-and-network" })
    const values = get(data, 'getStatesList.values', [])

    return (
        <Dropdown
            label="State"
            options={values.map(({value}) => value)}
        />
    )
}

// export const EthnicitySelect = () => {
//     const { data } = useQuery(GET_ETHNICITY_LIST, { fetchPolicy: "cache-and-network" })
//     const values = get(data, 'getEthnicityList.values', [])

//     return (
//         <Dropdown
//             label="Select One"
//             options={values.map(({value}) => value)}
//         />
//     )
// }

export const EthnicitySelect = ({ value = '', placeholder, onChange, onSuccess, onError }) => {
    const { loading, error, data } = useQuery(GET_ETHNICITY_LIST, {
        fetchPolicy: "cache-and-network"
    })
    const [updateEthnicity] = useMutation(UPDATE_ETHNICITY, {
        update: (cache, { data }) =>
            onSuccess(get(data, 'updateProfileFields', { ethnicity: null }))
    })
    const [selectedValue, setSelectedValue] = useState(value)

    const values = get(data, 'getEthnicityList.values', [])

    return (
        <Dropdown
            placeholder={placeholder}
            label="Ethnicity"
            value={selectedValue}
            displayValue={selectedValue}
            onValueChange={(ethnicity) => {
                setSelectedValue(ethnicity)
                onChange(ethnicity)
                try {
                    updateEthnicity({ variables: { ethnicity } })
                } catch (e) {
                    onError(e)
                }
            }} 
            options={values.map(({value}) => value)}
        />
    )
}