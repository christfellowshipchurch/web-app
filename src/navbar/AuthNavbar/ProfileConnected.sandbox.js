import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'
import { useAuth, useAuthQuery } from '../../auth'
import { GET_PROFILE_IMAGE } from '../queries'

import { Media } from '../../ui'

const ProfileConnected = ({ className, size }) => {
  const { logout, isLoggedIn } = useAuth()
  const { error, data } = useAuthQuery(GET_PROFILE_IMAGE)

  if(error){
    console.log('Profile Error', error)
  }

  return isLoggedIn && ( 
      <a
        href='/profile'
        style={{ width: size, height: size }}
        className={classnames(
          'cursor-hover',
          className
        )}
      >
        <Media
          imageUrl={get(data, 'currentUser.profile.photo.uri', '')}
          imageAlt={`Christ Fellowship Church - ${get(data, 'currentUser.profile.firstName')}`}
          ratio="1by1"
          circle
          className='opacity-hover'
        />
      </a>  
    )
}

ProfileConnected.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number
}

ProfileConnected.defaultProps = {
  className: '',
  size: 45
}

export default ProfileConnected
