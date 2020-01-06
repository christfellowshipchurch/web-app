import React, { useState } from 'react'
import { Query, Mutation, useQuery, useMutation } from 'react-apollo'
import { get } from 'lodash'
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons'

import { Dropdown } from '../ui'

import { GET_STATES, GET_CAMPUSES } from './queries'


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
    const { data } = useQuery(GET_STATES, { fetchPolicy: "cache-and-network" })
    const values = get(data, 'getStatesList.values', [])

    return (
        <Dropdown
            label="State"
            options={values.map(({value}) => value)}
            hideIcon
        />
    )
}