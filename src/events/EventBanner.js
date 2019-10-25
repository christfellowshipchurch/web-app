import React from 'react'
import classnames from 'classnames'
import { startCase } from 'lodash'

import { Media } from '../ui'

const EventBanner = ({
  image,
  eventName,
  subtitle
}) => {

  return (
    <div className='container-fluid banner'>
      <div className='row'>
        <div className={classnames(
          'col-12',
        )}
        >
          <Media
            imageUrl='https://picsum.photos/1920/1080'
            imageAlt='demo'
            className='banner'
            ratio="21by9"
            gradient="dark"
          >
            <div
              className={classnames(
                'py-5',
                'px-4',
                'w-100',
                'h-100',
                'max-width-1100',
                'd-flex',
                'align-items-end',
                'justify-content-start',
                'text-white',
              )}
            >
              <div>
                <h1 className='mb-0'>
                  {startCase(eventName)}
                </h1>
                <h3 className='mb-0 font-weight-light'>
                  Event Details
                </h3>
              </div>
            </div>
          </Media>
        </div>
      </div>
    </div>
  )
}

export default EventBanner
