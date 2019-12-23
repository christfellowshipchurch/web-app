import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  get,
  startCase
} from 'lodash'

import { Media } from '../ui'

const EventBanner = ({
  coverImage,
  title,
  summary
}) => {

  return (
    <div className='w-100'>
      <div className='row'>
        <div className={classnames(
          'col-12',
        )}
        >
          <Media
            imageUrl={get(coverImage, 'sources[0].uri', '')}
            imageAlt={get(coverImage, 'name', 'Event at Christ Fellowship Church')}
            className='max-height-45-vh'
            ratio={{ xs: "1by1", md: '21by9' }}
            gradient="black"
            forceRatio
          >
            <div
              className={classnames(
                'p-4',
                'w-100',
                'h-100',
                'max-width-1100',
                'd-flex',
                'align-items-end',
                'justify-content-start',
              )}
            >
              <div>
                <h1 className='text-white'>
                  {startCase(title)}
                </h1>
                <h4 className='mb-0 font-weight-light text-white'>
                  {summary}
                </h4>
              </div>
            </div>
          </Media>
        </div>
      </div>
    </div>
  )
}

EventBanner.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  coverImage: PropTypes.any, // eslint-disable-line
}

export default EventBanner
