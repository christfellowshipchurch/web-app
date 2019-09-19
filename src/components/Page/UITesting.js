import React from 'react'
import { Feature } from '../features'
import FloatingCard from '../ui/FloatingCard'

const DefaultPage = () => {

  return (
    <FloatingCard>
      <Feature name="rsvpForm" />
    </FloatingCard>
  )
}

DefaultPage.defaultProps = {
}

DefaultPage.propTypes = {
}

export default DefaultPage
