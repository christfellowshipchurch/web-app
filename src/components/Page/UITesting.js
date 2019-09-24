import React from 'react'
import { Feature } from '../features'
import FloatingCard from '../ui/FloatingCard'
import Accordion from '../ui/Accordion'

const TEST_ARRAY = [0, 1, 2, 3, 4, 5]

const DefaultPage = () => {

  return (
    <div className="container my-6">
      <div className="row">
        <div className="col">
          <Accordion>
            {TEST_ARRAY.map((n, i) =>
              <p key={i}>Hello! I'm the body</p>
            )}
          </Accordion>
        </div>
      </div>

      <hr></hr>

      <div className="row">
        <div className="col">
          <Accordion>
            <p>Hello! I'm the body</p>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage
