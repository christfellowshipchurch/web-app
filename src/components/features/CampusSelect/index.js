import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { get, find, sortBy, forEach } from 'lodash'
import classnames from 'classnames'
import zipcodes from 'zipcodes'
import moment from 'moment'

import { faAngleDown } from '@fortawesome/fontawesome-pro-light'
import { Button, Media, Loader } from '@christfellowshipchurch/web-ui-kit'
import InputIcon from '../../ui/inputs/TextInput'
import FloatingCard from '../../ui/FloatingCard'
import RsvpForm from '../RsvpForm'

import { GET_CAMPUSES } from './queries'

const normalizeDate = (date) => {
    if (!date || date === '') return ''

    const m = moment(date)
    const valuesToNormalize = ['hour', 'minute', 'second', 'millisecond']

    forEach(valuesToNormalize, n => m.set(n, 0))

    return m.toISOString()
}

const StyledCampusSelect = ({
    value,
    onChange,
    background,
    campuses,
    disabled
}) => (
        <div
            className={classnames(
                'd-flex',
                'justify-content-center',
                'align-items-center',
                "w-100",
                background,
                "border-0",
                "p-3",
                'w-100',
                'p-3',
                "rounded"
            )}
        >
            <select
                value={value}
                disabled={disabled}
                onChange={onChange}
                className={classnames(
                    "w-100",
                    'h-100',
                    "border-0",
                )}>
                {campuses.map((n, i) =>
                    <option
                        value={get(n, 'id', 'null')}
                        key={i}>
                        {get(n, 'name', '!! ERROR !!')}
                    </option>
                )}
            </select>
            <InputIcon icon={faAngleDown} />
        </div>
    )

const CampusTile = ({
    name,
    street1,
    city,
    state,
    postalCode,
    image,
    serviceTimes,
    onClick
}) => <div className="row max-width-1100">
        <div className="col-12 col-md px-3">
            <Media
                ratio="1by1"
                imageUrl={get(image, 'uri', '')}
                imageAlt={name}
                rounded
            />
        </div>
        <div className="col px-3 py-4">
            <h3>{name}</h3>
            <p className="text-dark mt-3 mb-2">
                {`${street1}`}
            </p>
            <p className="text-dark mb-3">
                {`${city}, ${state} ${postalCode.substring(0, 5)}`}
            </p>
            <Button
                title={`Get Directions`}
                type="dark"
            />

            <h3 className="mt-6">
                Select a service time to RSVP for:
            </h3>
            {serviceTimes.map((n, i) => (
                <Button
                    title={`${n.day.substring(0, 3)} ${n.time}`}
                    className="m-1"
                    key={i}
                    onClick={() => onClick({
                        day: moment().add(1, 'week').isoWeekday(n.day),
                        time: n.time
                    })}
                />
            ))}
        </div>
    </div>

const CampusSelect = ({
    background
}) => {
    const [rsvpForm, setRsvpForm] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [activeCampus, setActiveCampus] = useState(null)
    const { loading, error, data: campusesData } = useQuery(GET_CAMPUSES)

    if (loading) return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
            <Loader />
        </div>
    )

    let campuses = null

    if (campusesData) {
        campuses = get(campusesData, 'campuses', [])

        if (campuses.length) campuses = sortBy(campuses, ['name'])
    }

    const visibleCampus = activeCampus || campuses[0]
    const inputBackground = background === 'bg-white' ? 'bg-light' : 'bg-white'

    return (
        <div className="container py-6">
            <div className="row">
                <div className="col text-center">
                    <h2>
                        Choose a Location Near You
                    </h2>
                </div>
            </div>
            {!loading && !error && campuses && (
                <div className={classnames(
                    "row",
                    "justify-content-center",
                    "align-items-center",
                    "my-4",
                    "px-3",
                    "max-width-800"
                )}>
                    <div className="col-12 col-md px-3 my-3">
                        <StyledCampusSelect
                            value={get(activeCampus, 'id')}
                            disabled={disabled}
                            onChange={(e) => setActiveCampus(find(campuses, ['id', e.target.value]))}
                            background={inputBackground}
                            campuses={campuses}
                        />
                    </div>
                    <div className="col px-3">
                        <input
                            className={classnames(
                                "rounded",
                                inputBackground,
                                "border-0",
                                "text-center",
                                "p-3",
                                "w-100"
                            )}
                            type="number"
                            disabled={disabled}
                            placeholder="Or Enter Your Zip Code"
                            maxLength="5"
                            onChange={e => {
                                const value = e.target.value

                                if (value.length === 5) {
                                    setDisabled(true)

                                    let closest = { id: '', distance: 0 }

                                    const sortedCampuses = sortBy(campuses, [n => zipcodes.distance(
                                        parseInt(value),
                                        parseInt(n.postalCode.substring(0, 5)))]
                                    )

                                    setActiveCampus(sortedCampuses[0])
                                    setDisabled(false)
                                }
                            }} />
                    </div>
                </div>
            )}

            {visibleCampus &&
                <CampusTile
                    {...visibleCampus}
                    onClick={({ day, time }) => {
                        setRsvpForm({
                            visitDate: normalizeDate(day),
                            visitTime: time,
                            campus: get(visibleCampus, 'name', ''),
                        })
                    }}
                />
            }

            {rsvpForm &&
                <FloatingCard onPressExit={() => setRsvpForm(null)}>
                    <RsvpForm initialValues={rsvpForm} />
                </FloatingCard>
            }
        </div>
    )
}

CampusSelect.defaultProps = {
    background: 'bg-white'
}

CampusSelect.propTypes = {
    background: PropTypes.oneOf([
        'bg-white',
        'bg-light',
        'bg-transparent'
    ])
}

export default CampusSelect