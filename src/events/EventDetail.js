import React from 'react'
import classnames from 'classnames'

import { Card } from '../ui'
import EventRsvp from './EventRsvp'
import EventShare from './EventShare'

const eventsMulti = [
  {
    campus: 'Royal Palm Beach',
    address: '9905 Southern Blvd Royal Palm Beach, FL 33411',
    schedule:
      [{
        date: 'Sat Sep 27',
        time: ['9AM', '11AM']
      },
      {
        date: 'Sun Sep 28',
        time: ['8AM', '10AM']
      }
      ]
  },
  {
    campus: 'Gardens',
    address: '9905 Southern Blvd Royal Palm Beach, FL 33411',
    schedule:
      [{
        date: 'Sat Sep 20',
        time: ['9AM', '11AM']
      },
      {
        date: 'Sun Sep 21',
        time: ['8AM', '10AM']
      }]
  },
]


const EventDetail = ({
  htmlContent
}) => {

  return (
    <div className={classnames(
      'container',
      'my-4',
      'max-width-1100',
    )}>
      <div className="row">
        <div className="col-12 col-lg-4">
          <EventRsvp events={eventsMulti} />
          <EventShare />
        </div>

        <div className="col-12 col-lg-8">
          <Card>
            <h3 className='text-dark p-1'>Event Details</h3>
            <p className='article-body font-weight-light'>
              {htmlContent}
            </p>
            <h3 className='text-dark p-1'>Registration</h3>
            <p className='article-body font-weight-light'>
              This is a free event!
            </p>
          </Card>
        </div>
      </div>
    </div>

  )
}

export default EventDetail
