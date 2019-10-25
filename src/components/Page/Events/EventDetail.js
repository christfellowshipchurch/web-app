import React from 'react'
import { Card } from '../../../ui'
import EventRsvp from './EventRsvp'
import EventShare from './EventShare'
import classnames from 'classnames'

const eventsMulti = [
  {
    campus: 'Royal Palm',
    address: '9905 Southern Blvd Royal Palm Beach, FL 33411',
    schedule: 
      [{
        date: 'Sat Sep 27',
        time: [ '9AM', '11AM']
      },
      {
        date: 'Sun Sep 28',
        time: [ '8AM', '10AM']
      }
    ]
  },
  {
    campus: 'Gardens',
    address: '9905 Southern Blvd Royal Palm Beach, FL 33411',
    schedule: 
      [{
        date: 'Sat Sep 20',
        time: [ '9AM', '11AM']
      },
      {
        date: 'Sun Sep 21',
        time: [ '8AM', '10AM']
      }]
  },
]

const eventsSingle = [
  {
    campus: 'Royal Palm',
    address: '9905 Southern Blvd Royal Palm Beach, FL 33411',
    schedule: 
      [{
        date: 'Sat Sep 27',
        time: [ '9AM' ]
      }
    ]
  }
]


const EventDetail = ({ htmlContent }) => {

  return (
    <div className={classnames(
      'container',
      'p-0',
      'max-width-1100',
      'd-flex',
      'justify-content-center'
    )}>
      <div>
        <EventRsvp events={eventsMulti}/>
        <EventShare/>
      </div>
      <Card className={classnames(
        'max-width-800'
      )}>
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
            
  )
}

export default EventDetail
