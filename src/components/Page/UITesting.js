import React from 'react'
import { Feature } from '../features'
import FloatingCard from '../ui/FloatingCard'
import Tabs from '../ui/Tabs'

import { AuthNavbar } from '../Navbar'

const TEST_ARRAY = [0, 1, 2, 3,]
// const TEST_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const DefaultPage = () => {

  return (
    <AuthNavbar />
  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage
