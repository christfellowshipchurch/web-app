import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { keys } from 'lodash'
import { faPlayCircle } from '@fortawesome/fontawesome-pro-light'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MediaItem from './MediaItem'

const MediaContainer = ({
  children,
  style,
  className,
  ...mediaItemProps
}) => {
  if (!children || children.length === 0) return <MediaItem
    {...mediaItemProps}
    className={className}
    style={style}
  />

  return <div
    style={style}
    className={classnames(
      'overflow-hidden',
      'p-relative',
      className
    )}
  >
    <MediaItem
      {...mediaItemProps}
      className="fill"
      style={{ zIndex: -100, }}
    />
    {children}
  </div>
}

MediaContainer.defaultProps = {
  style: {},
  className: '',
}

MediaContainer.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
}

export default MediaContainer
