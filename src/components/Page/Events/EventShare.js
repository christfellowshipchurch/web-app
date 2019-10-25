import React from 'react'
import { Card } from '../../../ui'
import classnames from 'classnames'
import InputIcon from '../../../ui/inputs/inputIcon'
import { faCalendarPlus, faEnvelope } from "@fortawesome/pro-light-svg-icons"
import { faFacebookSquare, faTwitter,  } from "@fortawesome/free-brands-svg-icons"
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

const EventShare = ({ event }) => {
  const iconColor='#353535'

  return (
        <div>
          <Card>
            <div className='d-flex align-items-center'>
              <InputIcon icon={faCalendarPlus} className='mb-1'/>
              <h4 className='mb-0 mt-1 p-2'>Add to Calendar</h4>
            </div>
            <div className='d-flex align-items-center'>
              <InputIcon 
                icon={faFacebookSquare} 
                color={iconColor}
              />
              <InputIcon 
                icon={faTwitter} 
                color={iconColor}
            />
              <InputIcon 
                icon={faEnvelope} 
                color={iconColor}
            />
              <h4 className='mb-0 p-2'>Share</h4>
            </div>
          </Card>
        </div>
            
  )
}

export default EventShare
