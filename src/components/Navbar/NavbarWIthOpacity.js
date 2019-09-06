import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useScrollPosition } from '../../hooks'
import Navbar from './index'

const NavbarWithOpacity = ({ offset }) => {
  const [bgColor, setBgColor] = useState('transparent')
  const [variant, setVariant] = useState('dark')
  const [imageKey, setImageKey] = useState('brandImageAlt')

  useScrollPosition(({ currPos }) => {
    const opaque = currPos.y > (-1 * offset)

    setBgColor(opaque ? 'transparent' : 'white')
    setVariant(opaque ? 'dark' : 'light')
    setImageKey(opaque ? 'brandImageAlt' : 'brandImage')
  })

  return <Navbar bg={bgColor} variant={variant} brandImageKey={imageKey} />

}

NavbarWithOpacity.propTypes = {
  offset: PropTypes.number
}

NavbarWithOpacity.defaultProps = {
  offset: 50
}

export default NavbarWithOpacity
