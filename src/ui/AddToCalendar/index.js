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
  className,
  style
}) => (
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
          href={icsLink(event)}
        >
          <FontAwesomeIcon icon={faApple} /> Apple
        </Dropdown.Item>

        <Dropdown.Item
          href={googleCalLink(event)}
        >
          <FontAwesomeIcon icon={faGoogle} /> Google
        </Dropdown.Item>

        <Dropdown.Item
          href={icsLink(event)}
        >
          <FontAwesomeIcon icon={faMicrosoft} /> Outlook
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

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
  style: PropTypes.object
}

AddToCalendar.defaultProps = {
  type: 'link',
  title: 'Add to Calendar',
  className: '',
  style: {}
}

export default AddToCalendar