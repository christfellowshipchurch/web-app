import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  get,
  find
} from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faClock,
  faAngleDown
} from "@fortawesome/fontawesome-pro-regular"
import {
  Dropdown
} from 'react-bootstrap'
import moment from 'moment'

import {
  Button,
  Card,
} from '../ui'
import Icon from './eventIcon'

import { useAuth } from '../auth'
import { CAMPUS_KEY } from '../keys'
import { getDirectionsUrl } from '../utils'
import { GET_EVENT_SCHEDULES } from './queries'

const row = classnames(
  'row',
  'my-4'
)

const ScheduleList = ({ dates }) =>
  dates.map((n, i) => {
    const date = moment(n)

    return (
      <div
        className={row}
        key={`EventSchedule:${i}`}
      >
        <div className="col-12">
          <h3>
            <Icon
              icon={faCalendarAlt}
              className="mr-2"
            />
            {date.format('ddd MMM D')}
          </h3>
        </div>

        <div
          className='col-12'
          key={i}
        >
          <h4
            className='font-weight-normal'
          >
            <Icon
              icon={faClock}
              className="mr-2"
            />
            {date.format('LT')}
          </h4>
        </div>
      </div>
    )
  })

const CampusSelectToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    className="h6 text-secondary font-weight-normal"
    ref={ref}
    onClick={e => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
    <span
      className="ml-2"
    >
      <FontAwesomeIcon
        icon={faAngleDown}
      />
    </span>
  </a>
))

const parseSchedulesByCampus = (schedules = []) => {
  // Set an empty array for adding dates
  let parsed = []

  // Loop through each schedule and add new campus specific dates
  schedules.forEach(schedule => {
    const { campuses } = schedule
    const campusDates = campuses.map(campus => ({
      campus,
      dates: schedule.dates,
      location: schedule.location
    }))

    parsed = [...parsed, ...campusDates]
  })

  return parsed
}

const EventSchedule = ({
  id,
  defaultCampus,
  callsToAction,
}) => {
  const [payload, setPayload] = useState({})
  const { isLoggedIn } = useAuth()
  const { loading, error, data } = useQuery(
    GET_EVENT_SCHEDULES,
    {
      variables: { id },
      onCompleted: (data) => {
        const schedules = get(data, 'node.childContentItemsConnection.edges', [])
          .map(edge => edge.node)
        const schedulesByCampus = parseSchedulesByCampus(schedules)
        const selectedCampus = schedulesByCampus.length == 1
          ? schedulesByCampus[0]
          : find(schedulesByCampus, (n) => n.campus.name === defaultCampus)

        setPayload(selectedCampus)
      }
    }
  )

  // Map the children to a collection of content items
  const schedules = get(data, 'node.childContentItemsConnection.edges', [])
    .map(edge => edge.node)

  const schedulesByCampus = parseSchedulesByCampus(schedules)

  return <Card
    className="py-3"
    loading={loading}
    error={get(error, 'message', null)}
  >
    <div>
      <div className="row">
        <div className="col">
          <h3 className="text-dark mb-0">
            {get(payload, 'campus.name', '')}
          </h3>
          <Dropdown
            onSelect={(key, e) => {
              e.preventDefault()
              const campusStr = key.replace('#/', '')

              setPayload(find(schedulesByCampus, (n) => n.campus.name === campusStr))
              if (!isLoggedIn) localStorage.setItem(CAMPUS_KEY, campusStr)
            }}
          >
            <Dropdown.Toggle
              variant="link"
              id="event-campus-selection"
              as={CampusSelectToggle}
            >
              {get(payload, 'campus.name', '') === ''
                ? 'Select Campus'
                : 'Change Campus'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {schedulesByCampus.map((n, i) =>
                <Dropdown.Item
                  key={i}
                  href={`#/${n.campus.name}`}
                  active={n === get(payload, 'campus', '')}
                >
                  {n.campus.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <ScheduleList dates={get(payload, 'dates', [])} />

      <hr></hr>

      <div className="row mt-4">
        <div className="col">
          <a
            className="text-dark"
            href={getDirectionsUrl(get(payload, 'location', ''))}
            target="_blank"
          >
            {get(payload, 'location', '')}
          </a>
        </div>
      </div>

      {callsToAction.map((n, i) => (
        <div className="row my-4" key={i}>
          <div className="col">
            <a
              className={classnames(
                'btn',
                'btn-primary',
                'btn-block',
              )}
              href={n.action}
            >
              {n.call}
            </a>
          </div>
        </div>
      ))}
    </div>
  </Card>
}

EventSchedule.propTypes = {
  id: PropTypes.string.isRequired,
  defaultCampus: PropTypes.string,
  callsToAction: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  )
}

EventSchedule.defaultProps = {
  defaultCampus: '',
  callsToAction: []
}

export default EventSchedule
