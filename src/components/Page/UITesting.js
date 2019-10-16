import React from 'react'
import { Feature } from '../features'
import FloatingCard from '../../ui/FloatingCard'
import { Tabs, ButtonRow, Button} from '../../ui'

const TEST_ARRAY = [0, 1, 2, 3,]
// const TEST_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const DefaultPage = () => {

  return (
    <div className='container p-5 text-center'>
      <div className='row'>
        <div className='col'>
          <ButtonRow callToAction/>
          <br/>
          <Button gradient color='warning'/>
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
