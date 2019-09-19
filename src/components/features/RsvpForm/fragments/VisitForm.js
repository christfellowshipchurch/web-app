import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import moment from 'moment'
import {
    get,
    find,
    uniqBy,
    forEach,
    sortBy,
    filter,
    toUpper
} from 'lodash'
import {
    faChurch,
    faCalendarAlt,
    faClock
} from '@fortawesome/fontawesome-pro-light'
import {
    Loader,
    Dropdown,
} from '@christfellowshipchurch/web-ui-kit'

import { GET_CAMPUSES } from '../queries'

const normalizeDate = (date) => {
    if (!date || date === '') return ''

    const m = moment(date)
    const valuesToNormalize = ['hour', 'minute', 'second', 'millisecond']

    forEach(valuesToNormalize, n => m.set(n, 0))

    return m.toISOString()
}

const noramlizeTime = (time) => {
    const clean = toUpper(time).replace('PM', '').replace('AM', '')
    const suffix = toUpper(time.includes('AM')) ? 'AM' : 'PM'

    return clean.includes(':')
        ? `${clean} ${suffix}`
        : `${clean}:00 ${suffix}`
}

const NUMBER_OF_WEEKS = 12

const VisitForm = ({
    errors,
    setFieldValue,
    values
}) => {
    const { loading, error, data } = useQuery(GET_CAMPUSES)

    if (loading) return (
        <div className="row justify-content-center">
            <Loader />
        </div>
    )

    if (error) return <h3 className="text-danger">There was an error, please try reloading</h3>

    // Set the campus value to the current value of a campus
    //  or the the first result of the return data from the
    //  campuses object, or just default to an empty object
    const campuses = get(data, 'campuses', [])
    const campusValue = get(
        values, 'campus',
        get(campuses, '[0]', {})
    )
    const visitDateValue = normalizeDate(get(values, 'visitDate', ''))
    const visitTimeValue = get(values, 'visitTime', '')
    const serviceTimes = get(
        find(campuses, ['name', campusValue]),
        'serviceTimes',
        []
    )

    /***  Service Days ***/
    // Get service days from the active campus and 
    //   map to a string array of days like: ['Day', 'Day']
    const days = uniqBy(serviceTimes, 'day').map(n => n.day)
    let availableServices = []

    // Loop from 0 through the number of weeks that we want to allow people to select
    for (var i = 0; i < NUMBER_OF_WEEKS; i++) {
        // Loop through each of the service days and append the day
        //  for `i` weeks in the future to availableServices array
        forEach(days, n =>
            availableServices.push(moment().add(i, 'weeks').isoWeekday(n))
        )
    }

    /***  Service Times ***/
    // Get the selected Visiting Date
    let times = []
    if (visitDateValue) {
        // If there exists a visitDate, filter service
        //  times to only select the times that are available
        //  on that selected day of week
        times = filter(serviceTimes, (n) => {
            // Here's what's happening in this conditional statement
            // First Param => takes a day of week and converts it to a moment object of 
            //                  that upcoming day of week and then gets the day from that date
            // Second Param => takes a day and converts it to a moment object
            //                  and then gets the day from that date
            return moment().day(n.day).day() === moment(visitDateValue).day()
        })
    }

    return (
        <React.Fragment>
            <div className="row mb-4">
                <div className="col">
                    <Dropdown
                        icon={faChurch}
                        value={campusValue}
                        onChange={(e) => setFieldValue('campus', e.target.value)}
                        options={campuses.map(n => get(n, 'name', ''))}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <Dropdown
                        icon={faCalendarAlt}
                        value={visitDateValue}
                        onChange={(e) => setFieldValue('visitDate', e.target.value)}
                        options={sortBy(availableServices, n => moment(n))
                            .map(n => ({
                                label: moment(n).format('dddd, MMM D'),
                                value: normalizeDate(n)
                            }))
                        }
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <Dropdown
                        icon={faClock}
                        value={visitTimeValue}
                        onChange={(e) => setFieldValue('visitTime', get(e, 'target.value', ''))}
                        options={times.map(n => ({
                            label: n.time,
                            value: noramlizeTime(n.time)
                        }))}
                    />
                </div>
            </div>
        </React.Fragment >
    )
}

const VisitFormWithCampuses = (props) => {
    const { loading, error, data } = useQuery(GET_CAMPUSES)

    if (loading) return (
        <div style={{ width: 200 }}>
            <Loader />
        </div>
    )
    if (error) {
        console.log({ error })
        return (
            <h2 className="text-danger text-center">
                There was an error. Try reloading
            </h2>
        )
    }

    const campuses = get(data, 'campuses', [])

    return (
        <VisitForm
            campuses={campuses}
            {...props}
        />
    )
}

export default VisitFormWithCampuses