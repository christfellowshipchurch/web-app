import React from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from 'lodash'

import {
  Dropdown
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGoogle,
  faApple,
  faMicrosoft
} from '@fortawesome/free-brands-svg-icons'

import {
  googleCalLink,
  icsLink
} from './utils'

const AddToCalendar = ({
  event,
  type,
  title,
  allDay,
  className,
  style,
  iCalendarDescription
}) => {

  
  return(
    <Dropdown>
      <Dropdown.Toggle
        id={uniqueId('add-to-calendar-')}
        variant={type}
        className={className}
        style={style}
      >
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          href={icsLink({ description: iCalendarDescription, ...event.props }, allDay)}
          target='_blank'
        >
          <FontAwesomeIcon icon={faApple} /> Apple
        </Dropdown.Item>

        <Dropdown.Item
          href={googleCalLink(event, allDay)}
          target='_blank'
        >
          <FontAwesomeIcon icon={faGoogle} /> Google
        </Dropdown.Item>

        <Dropdown.Item
          href={icsLink(event, allDay)}
          target='_blank'
        >
          <FontAwesomeIcon icon={faMicrosoft} /> Outlook
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )}

AddToCalendar.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    address: PropTypes.string,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark",
    "link"
  ]),
  title: PropTypes.string,
  className: PropTypes.string,
  allDay: PropTypes.bool,
  style: PropTypes.object,
  iCalendarDescription: PropTypes.string
}

AddToCalendar.defaultProps = {
  type: 'link',
  title: 'Add to Calendar',
  allDay: false,
  className: '',
  style: {},
  iCalendarDescription: `Join us for an event at Christ Fellowship!`
}

export default AddToCalendar