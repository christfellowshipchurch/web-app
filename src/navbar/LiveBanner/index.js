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
      fetchPolicy: "cache-and-network",
      pollInterval: 60000
    })

    if (loading || error) return null

    const isLive = get(data, 'liveStream.isLive', false)
    const startTime = moment(get(data, 'liveStream.eventStartTime', Date())).format('HHmm')
    const halfHourBefore = moment(get(data, 'liveStream.eventStartTime', Date())).subtract(30, 'minutes').format('HHmm')
    const currentTime = moment().format('HHmm')

    let almostLive = false

    //checks if service starts in the next 30 min
    if (!isLive) {
      if ( halfHourBefore < currentTime < startTime) {
        almostLive = true
      }
    }

    //checks if the user is on home page AND logged out in order to display Light Banner
    const page = window.location.pathname
    let lightBanner
    if(!isLoggedIn){
      if(page === '' || page === '/'){
        lightBanner = true
      }
    } 

    console.log({ halfHourBefore }, { currentTime }, { startTime })

    return isLive || almostLive ? (
      <div 
        className={classnames(
          'w-100',
          `bg-${
            lightBanner
              ? 'white'
              : 'primary'
            }`,
          `d-${
            closed
              ? 'none'
              : 'flex'
            }`,
          'justify-content-between',
          'align-items-center',
          'px-4',
      )}>
        <div
          className='d-none d-lg-block'
        />
        <a
          href='#'
          onClick={() => redirectTo('https://live.gochristfellowship.com/', true)}
          className={classnames(
            'd-flex',
            'align-items-center'
          )}
        >
          <h4 className={classnames(
            `text-${
              lightBanner
                ? 'dark'
                : 'white'
            }`,
            'mb-0'
          )}>
            {almostLive
              ? 'We’re almost live! Join here!'
              : 'We’re live! Join now!'}
          </h4>
          {!almostLive
            ? <p 
                className={classnames(
                  'badge',
                  'badge-danger',
                  'mb-0',
                  'mx-3'
                )}
              >
                LIVE
              </p>
            : null
          }
        </a>
        <div>
          <FontAwesomeIcon
            style={{fontSize:'20px'}}
            className={classnames(
              'cursor-hover',
              'my-2',
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