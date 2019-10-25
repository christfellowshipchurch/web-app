import React from 'react'
import {
  get, has, toLower, kebabCase
} from 'lodash'

const events = [
  "Caleb's Event",
  "Danny's Event",
  "Rob's Event",
]

const EventList = ({ }) => {
  return (
    <div className="container py-6">
      <div className="row">
        <div className="col text-center">
          <h3>Click on an event below to view details</h3>
        </div>
      </div>
      <div className="row">
        {events.map((n, i) => (
          <div className="col-6 col-md-4 p-3" key={i}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {n}
                </h5>

                <a href={`/events/${kebabCase(toLower(n))}/`}>
                  View event
                  </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

EventList.propTypes = {
}

EventList.defaultProps = {
}

export default EventList
