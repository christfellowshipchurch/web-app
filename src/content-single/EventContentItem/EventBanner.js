import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  get,
  startCase
} from 'lodash'

import { Media } from '../../ui'

const EventBanner = ({
  coverImage,
  title,
  summary
}) => {

  return (
    <>
    <Media 
      imageUrl={get(coverImage, 'sources[0].uri', '')}
      imageAlt={get(coverImage, 'name', 'background image')}
      className='max-height-45-vh'
      gradient="black"
      ratio='21by9'
      forceRatio
      style={{
        filter: 'blur(9px)'
    }}
    />
    <div className={classnames(
      'px-3',
      )}
      style={{
        zIndex: 5
      }}
    >
      <div className={classnames(
        'row',
        'max-width-800',
        'mx-auto',
      )}>
        <div className={classnames(
          'col-12'
        )}>
          <Media
            imageUrl={get(coverImage, 'sources[0].uri', '')}
            imageAlt={get(coverImage, 'name', 'bg blur')}
            className='max-height-45-vh'
            ratio={{ xs: "1by1", md: '16by9' }}
            gradient="black"
            forceRatio
            rounded
            style={{
              position: 'absolute',
              top: -400,
            }}
          >
            <div
              className={classnames(
                'p-4',
                'w-100',
                'h-100',
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
    </>
  )
}

EventBanner.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  coverImage: PropTypes.any, // eslint-disable-line
}

export default EventBanner
