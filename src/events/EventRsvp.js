import React, { useState } from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faCalendarCheck
} from "@fortawesome/pro-light-svg-icons"

import { Carousel } from 'react-bootstrap'
import { Card, Button, Dropdown } from '../ui'
import Icon from './eventIcon'
import InputIcon from '../ui/inputs/inputIcon'
import { redirectTo, getDirectionsUrl } from '../utils'

const row = classnames(
  'row',
  'my-4'
)


const EventRsvp = ({ events }) => {
  const [selected, setSelected] = useState(0)
  const [schedule, setSchedule] = useState(0)
  const [index, setIndex] = useState(0)
  const [rsvp, setRsvp] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  let multiTime = false

  if (events.length > 1) {
    if (events[0].campus.length > 1) {
      multiTime = true
    }

  }

  return (
    <Card>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={null}
      >
        <Carousel.Item>
          <div className="container-fluid">
            {events[selected].schedule.map((n, i) => {
              return (
                <div
                  className={row}
                  key={i}
                >
                  <div className="col-12">
                    <h3>
                      <Icon
                        icon={faCalendarAlt}
                        className="mr-2"
                      />
                      {n.date}
                    </h3>
                  </div>

                  {n.time.map((n, i) => {
                    return (
                      <div
                        className='col-12'
                        key={i}
                      >
                        <h4
                          className='font-weight-light'
                        >
                          <Icon
                            icon={faClock}
                            className="mr-2"
                          />
                          {n}
                        </h4>
                      </div>
                    )
                  })}
                </div>
              )
            })}

            <div className={row}>
              <div className="col-12">
                <h4>{events[selected].campus}</h4>
              </div>

              <div className="col-12">
                <a
                  href={getDirectionsUrl(events[selected].address)}
                  target="_blank"
                  className="text-secondary"
                >
                  {events[selected].address}
                </a>
              </div>
            </div>

            <div className={row}>
              <div className="col">
                {rsvp
                  ? <div>
                    <h4>
                      <Icon icon={faCalendarCheck} className="text-primary mr-2" />
                      You've RSVP'd to this event!
                    </h4>
                  </div>
                  : <Button
                    className="btn-block"
                    call='save'
                    onClick={() => {
                      setLoading(true)
                      setTimeout(() => {
                        setRsvp(true)
                        setLoading(false)
                      }, 5000)
                    }}
                    loading={loading}
                  />
                }

              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>

        </Carousel.Item>

        <Carousel.Item>

        </Carousel.Item>

        <Carousel.Item>

        </Carousel.Item>
      </Carousel>
    </Card>
  )

  return (
    <div>
      <Card>
        {rsvp
          ?
          multiTime
            ?
            // menu for choosing date, time, and campus
            <>
              <h3 className='p-4'>Please Select a date and time to RSVP</h3>
              <Dropdown
                icon={faCalendarAlt}
                options={events[selected].schedule.map(n => (n.date))}
                onChange={(e) => setSchedule(e.target.selectedIndex)}
              />
              <br />
              <Dropdown
                icon={faClock}
                options={events[selected].schedule[schedule].time.map(n => (n))}
              />
              <br />
              <Dropdown
                icon={faMapMarkerAlt}
                options={events.map(n => (n.campus))}
                onChange={(e) => setSelected(e.target.selectedIndex)}
              />
            </>
            :
            // confirmation
            <>
              <h3>Awesome!</h3>
              <p className='font-weight-light article-body'>You're all set and confirmed to attend on:</p>
              <div className='d-flex align-items-center p-1'>
                <InputIcon icon={faCalendarAlt} color='gray' />
                <h3 className='mb-0 pl-1'>{events[selected].schedule[0].date}</h3>
              </div>
              <div className='d-flex align-items-center p-1 mb-1'>
                <InputIcon icon={faClock} color='gray' />
                <p className='mb-0 p-1 font-weight-light'>{events[selected].schedule[0].time[0]}</p>
              </div>
              <div className='d-flex align-items-center p-1 mb-1'>
                <InputIcon icon={faMapMarkerAlt} color='gray' />
                <p className='mb-0 p-1 font-weight-light'>{events[selected].campus}</p>
              </div>
            </>
          :
          //Shows all times and locations
          <>
            {/* Times */}
            {events[selected].schedule.map((n, i) => {
              return (
                <div
                  className='mb-3'
                  key={i}
                >
                  <div className='d-flex align-items-center p-1'>
                    <InputIcon icon={faCalendarAlt} color='gray' />
                    <h3 className='mb-0 pl-1'>{n.date}</h3>
                  </div>
                  {n.time.map((n, i) => {
                    return (
                      <div
                        className='d-flex align-items-center p-1 mb-1'
                        key={i}
                      >
                        <InputIcon icon={faClock} color='gray' />
                        <p className='mb-0 p-1 font-weight-light'>{n}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <br />
            {/* Location */}

            <div>
              <h4>{events[selected].campus}</h4>
              <p className='article-body font-weight-light'>{events[selected].address}</p>
            </div>
          </>
        }


        {/* RSVP Confirmation Button */}
        <div className='text-center pt-4'>
          {multiTime
            ?
            <>
              <Button
                call={rsvp ? 'confirm' : 'rsvp'}
                action=''
                onClick={() => setRsvp(!rsvp)}
              />
              {rsvp &&
                <Button
                  type='link'
                  title='cancel'
                  onClick={() => setRsvp(!rsvp)}
                />}
            </>
            :
            rsvp
              ?
              <>

              </>
              :
              <Button
                call='rsvp'
                onClick={() => setRsvp(!rsvp)}
              />
          }
        </div>
      </Card>
    </div>

  )
}

export default EventRsvp
