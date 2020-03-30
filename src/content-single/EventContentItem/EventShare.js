import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'
import { get, lastIndexOf } from 'lodash'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share'

import {
  faCalendarPlus,
  faEnvelope
} from "@fortawesome/pro-light-svg-icons"
import {
  faFacebookSquare,
  faTwitter
} from "@fortawesome/free-brands-svg-icons"
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import { Card, AddToCalendar } from '../../ui'
import EventIcon from './eventIcon'

const EventShare = ({
  title,
  description,
  address,
  events,
  className
}) => {

  const startTime = get(events, '[0].start', new Date())
  const lastEvent = events.length - 1
  const endTime = get(events, `[${lastEvent}].end`, new Date())

  console.log({startTime, endTime})

  return (
    <div
      className={className}
    >
      <Card>
        <h3>Share</h3>
        {events.length != 0 &&
          <div className='d-flex align-items-center px-3'>
              <EventIcon
                icon={faCalendarPlus}
                className='mr-2'
              />
              
                <AddToCalendar
                  className={classnames(
                    "p-0",
                    "text-dark",
                    "font-weight-bold",
                  )}
                  style={{
                    fontSize: '1.125rem',
                    letterSpacing: 'normal'
                  }}
                  event={{
                    title,
                    description,
                    address,
                    startTime,
                    endTime
                  }}
                  
                />
            </div>
        }
          
       
        <div className='d-flex align-items-center px-3'>
          <FacebookShareButton
            url={document.URL}
            quote={`Check out ${title} happening at Christ Fellowship Church!`}
          >
            <a href="#">
              <EventIcon
                icon={faFacebookSquare}
                color='primary'
              />
            </a>
          </FacebookShareButton>

          <TwitterShareButton
            url={document.URL}
            quote={`${title} at Christ Fellowship Church`}
          >
            <a href="#">
              <EventIcon
                icon={faTwitter}
                color='primary'
                className="mx-2"
              />
            </a>
          </TwitterShareButton>

          <EmailShareButton
            url={document.URL}
            subject={`${title} at Christ Fellowship Church`}
            body={`Check out ${title} happening at Christ Fellowship Church! I would love for you to join me.`}
          >
            <a href="#">
              <EventIcon
                icon={faEnvelope}
                color='primary'
              />
            </a>
          </EmailShareButton>
        </div>
      </Card>
    </div>

  )
}

EventShare.propType = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  address: PropTypes.string.isRequired,
  events: PropTypes.array
}

EventShare.defaultProps = {
  title: "Caleb's Event",
  description: "This event is being hosted by Caleb and you should come.",
  address: document.URL,
  events: [],
}

export default EventShare
