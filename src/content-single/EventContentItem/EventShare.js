import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share'

import {
  faCalendarPlus,
  faEnvelope,
  faSms
} from "@fortawesome/pro-light-svg-icons"
import {
  faFacebookSquare,
  faTwitter
} from "@fortawesome/free-brands-svg-icons"

import { Card, AddToCalendar } from '../../ui'
import EventIcon from './eventIcon'

const EventShare = ({
  title,
  description,
  address,
  events,
  className
}) => {

  // Gets the very first and very last time of Schedules
  const startTime = get(events, '[0].start', null)
  const lastEvent = events.length > 1 
    ? events.length - 1
    : 0
  const endTime = get(events, `[${lastEvent}].end`, null)

  // Creates URL for SMS
  const smsUrl = ( string ) => {
    const encodedString = encodeURI(string)
    const url = `sms://?&body=${encodedString}`
    return url
  }

  const shareMessages = {
    faceBookShare: `Check out ${title} happening at Christ Fellowship Church!`,
    twitterShare: `${title} at Christ Fellowship Church`,
    emailShare: {
        subject: `${title} at Christ Fellowship Church`,
        body: `Check out ${title} happening at Christ Fellowship Church! I would love for you to join me. \n\n ${document.URL}`,
      },
    smsShare: `Join me for ${title} at Christ Fellowship! ${document.URL}`
    }

  return (
    <div
      className={className}
    >
      <Card>
        <h3>Share</h3>
        {events.length != 0 &&
          <div className='d-flex d-block align-items-center px-3'>
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
                  alternateDescription={`Join us for ${title} at Christ Fellowship!`}
                />
            </div>
        }
          
       
        <div className='d-flex align-items-center px-3'>
          <FacebookShareButton
            url={document.URL}
            quote={shareMessages.faceBookShare}
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
            quote={shareMessages.twitterShare}
          >
            <a href="#">
              <EventIcon
                icon={faTwitter}
                color='primary'
                className="mx-3"
              />
            </a>
          </TwitterShareButton>

          <EmailShareButton
            url={document.URL}
            subject={shareMessages.emailShare.subject}
            body={shareMessages.emailShare.body}
          >
            <a href="#">
              <EventIcon
                icon={faEnvelope}
                color='primary'
              />
            </a>
          </EmailShareButton>
          <a 
            href={smsUrl(shareMessages.smsShare)}
            className={classnames(
              'mx-3',
              'd-md-none'
            )}
          >
            <EventIcon
                icon={faSms}
                color='primary'
            />
          </a>
        </div>
      </Card>
    </div>

  )}

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
