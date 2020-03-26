import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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

import { Card, AddToCalendar, FloatingCard } from '../../ui'
import EventIcon from './eventIcon'

const EventShare = ({
  title,
  description,
  address,
  startTime,
  endTime,
  onPressExit
}) => {
  console.log('url', document.URL)
  return (
    <div>
      <FloatingCard 
        className="p-3"
        onPressExit={
          () => onPressExit()
        }
      >
        <div
          className={classnames(
            'd-flex',
            'align-items-center',
            'justify-content-center'
            )}
        >
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
        <div
          className={classnames(
            'd-flex',
            'align-items-center',
            'justify-content-center'
            )}
        >          
          <FacebookShareButton
            url={document.URL}
            quote={`Check out ${title} happening at Christ Fellowship Church!`}
          >
            <a href="#">
              <EventIcon
                icon={faFacebookSquare}
              />
            </a>
          </FacebookShareButton>

          <TwitterShareButton
            url={document.URL}
            title={`${title} at Christ Fellowship Church`}
          >
            <a href="#">
              <EventIcon
                icon={faTwitter}
                className="mx-2"
              />
            </a>
          </TwitterShareButton>

          <EmailShareButton
            url={document.URL}
            subject={`${title} at Christ Fellowship Church`}
            body={`Check out ${title} happening at Christ Fellowship Church! I would love if you joined ne.`}
          >
            <a href="#">
              <EventIcon
                icon={faEnvelope}
              />
            </a>
          </EmailShareButton>
          <h4 className='mb-0 p-2 text-dark'>Share</h4>
        </div>
      </FloatingCard>
    </div>

  )
}

EventShare.propType = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string,
}

EventShare.defaultProps = {
  title: "Caleb's Event",
  description: "This event is being hosted by Caleb and you should come.",
  address: "5343 Northlake Blvd. Palm Beach Gardens, FL 33418",
  startTime: 'November 1, 2019 8:00pm',
  endTime: 'November 1, 2019 9:00pm',
}

export default EventShare
