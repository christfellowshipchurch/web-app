import React from 'react'
import { Media } from '../../../ui'
import classnames from 'classnames'

const EventBanner = ({image, eventName, subtitle}) => {

  return (
    <div className='container-fluid banner'>
    <div className='row'>
      <div className={classnames(
        'col-12',
        'd-flex',
      )}
      >
        <div
          className="p-absolute w-100 h-100"
          style={{ top: 0, left: 0}}>
          <Media
            imageUrl='https://picsum.photos/1920/1080'
            imageAlt='demo'
            className='banner d-flex justify-content-center'
          >
            <div
              className={classnames(
                'text-white',
                'p-absolute'
                )}
              style={{ bottom: '40px', width: '1000px'}}
            >
              <p className='mb-0'>Dream Team</p>
              <h2 className='mb-0'>{eventName}</h2>
              <h3 className='mb-0'>Event Details</h3>
            </div>
          </Media>
        </div>
      </div>
        </div>
        </div>
  )
}

export default EventBanner
