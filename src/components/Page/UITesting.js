import React, { useState } from 'react'
import { Feature } from '../features'
import { Tabs, ButtonRow, Button, Checkbox, Radio } from '../../ui'

import { AuthNavbar } from '../Navbar'

const TEST_ARRAY = [0, 1, 2, 3,]
// const TEST_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]



const DefaultPage = () => {
  const [enabled, setEnabled] = useState(false)
  const [gender, setGender] = useState('Male')


  return (
    <div className='container p-5 text-left'>
      <div className='row'>
        <div className='col'>
          <Checkbox
            label="Checkbox"
            onClick={() => setEnabled(!enabled)}
            checked={enabled}
          />

          <br />

          <Radio
            options={['Male', 'Female']}
            label='Gender'
            onClick={(value) => setGender(value)}
            value={gender}
          />
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
