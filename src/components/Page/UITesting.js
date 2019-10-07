import React from 'react'
import { Feature } from '../features'
import FloatingCard from '../../ui/FloatingCard'
import Tabs from '../../ui/Tabs'

const TEST_ARRAY = [0, 1, 2, 3,]
// const TEST_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const DefaultPage = () => {

  return (
    <div className="container-fluid my-6">
      <div className="row">
        <div className="col">
          <Tabs>
            <div title="Test">
              This is a test
              </div>
          </Tabs>

          <div className="my-5"></div>

          <Tabs>
            {TEST_ARRAY.map((n, i) => (
              <div title={`Test ${i}`} key={i}>
                This is a test {i}
              </div>
            ))}
          </Tabs>
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
