import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import classnames from 'classnames'
import moment from 'moment'
import { faTimes } from '@fortawesome/fontawesome-pro-light'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { GET_LIVE_STREAM } from './queries'
import { redirectTo } from '../../utils'
import { useAuth } from '../../auth'

const LiveBanner = () => {
  const [closed, isClosed] = useState(false)
  const { isLoggedIn } = useAuth()

  const { loading, error, data } = useQuery(GET_LIVE_STREAM, {
    fetchPolicy: "network-only",
    pollInterval: 60000,
  })

  if (loading || error) return null

  const isLive = get(data, 'liveStream.isLive', false)
  const startTime = moment(get(data, 'liveStream.eventStartTime', Date()))
  const halfHourBefore = moment(get(data, 'liveStream.eventStartTime', Date()))
    .subtract(30, 'minutes')
  const currentTime = moment()

  let almostLive = false

  //checks if service starts in the next 30 min
  if (!isLive) {
    if (currentTime.isBetween(halfHourBefore, startTime)) {
      almostLive = true
    }
  }

  //checks if the user is on home page AND logged out in order to display Light Banner
  const page = window.location.pathname
  let lightBanner
  if (!isLoggedIn) {
    if (page === '' || page === '/') {
      lightBanner = true
    }
  }

  return isLive || almostLive ? (
    <div
      className={classnames(
        'w-100',
        'justify-content-start',
        'justify-content-md-center',
        'align-items-center',
        'p-2',
        {
          'bg-white': lightBanner,
          'bg-primary': !lightBanner,
          'd-none': closed,
          'd-flex': !closed
        }
      )}
    >
      <a
        className={classnames(
          'h4',
          'mb-0',
          {
            'text-dark': lightBanner,
            'text-white': !lightBanner,
          }
        )}
        href='https://live.gochristfellowship.com/'
        target="_blank"
      >
        {almostLive
          ? 'We’re almost live! Join here!'
          : 'Join us for Church Online!'}
        {!almostLive &&
          <span
            className={classnames(
              'badge',
              'badge-danger',
              'mx-2',
              'py-1',
              'px-2',
            )}
            style={{
              fontSize: '85%',
              borderRadius: 3
            }}
          >
            LIVE
          </span>
        }
      </a>
      <div
        style={{
          fontSize: '20px',
          position: 'absolute',
          right: 10
        }}
      >
        <FontAwesomeIcon
          className={classnames(
            'cursor-hover',
          )}
          color={
            lightBanner
              ? 'grey'
              : 'white'}
          icon={faTimes}
          onClick={() => isClosed(true)}
        />
      </div>
    </div>
  ) : null
}

export default LiveBanner