import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get, includes, toLower } from 'lodash'
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

  // Gets the very first and very last schedule
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

  // TODO: Come up with a different fix for Easter!!!!
  // If the title is for Easter it will use the specific prewritten messages for that event.
  // Else it will use the generic messages.
  const isEaster = includes(toLower(title), 'easter')

  const shareMessages = isEaster 
    ? {
      faceBookShare: `An Online Easter Service Just for You`,
      twitterShare: `I'll be watching Easter at Christ Fellowship online! \nWill you? \n`,
      emailShare: {
        subject: `An Online Easter Service Just for You`,
        body: `Hey, \n\n I'm gonna be watching Easter at Christ Fellowship online. Would you like to watch with me? \n\n Check out EasteratCF.com to view when the service times are, as well as how you can watch online.`,
      },
      smsShare: `Hey, I'm gonna be watching Easter at Christ Fellowship online. Would you like to watch with me? If so, check out EasteratCF.com to view when the service times are, as well as how you can watch online.`
    }
    : {
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
          <div className='d-flex align-items-center'>
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
                    // Location is the webUrl for now
                    address: document.URL,
                    startTime,
                    endTime
                  }}
                  alternateDescription={isEaster
                    ? `Tune in to an online Easter service at Christ Fellowship via your phone, laptop, or TV. \n\n To view an online Easter service, click the link below.`
                    : `Join us for ${title} at Christ Fellowship!`
                  }
                  allDay
                />
            </div>
        }
          
       
        <div className='d-flex align-items-center'>
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
            title={shareMessages.twitterShare}
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
