import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'
import { useAuth, useAuthQuery } from '../../auth'
import { GET_PROFILE_IMAGE } from '../queries'

import { Media, Loader } from '../../ui'
import { Icon } from '../../ui/Icons'

const ProfileConnected = ({ className, size }) => {
  const { logout, isLoggedIn } = useAuth()
  const { error, loading, data } = useAuthQuery(GET_PROFILE_IMAGE)

  const hasPhoto = get(data, 'currentUser.profile.photo.uri', '') 

  if(error){
    console.log('Profile Error', error)
  }

  if(loading) return <Loader />

  return isLoggedIn && ( 
      <a
        href='/profile'
        style={hasPhoto && { width: size, height: size }}
        className={classnames(
          'cursor-hover',
          className,
        )}
      >
        {hasPhoto     
          ? <Media
              imageUrl={get(data, 'currentUser.profile.photo.uri', '')}
              imageAlt={`Christ Fellowship Church - ${get(data, 'currentUser.profile.firstName')}`}
              ratio="1by1"
              circle
              className='opacity-hover'
            />
          : <Icon 
              className='pr-1'
              name='user-circle'
              fill='#00aeef'
              size={24}
            />
        }
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
