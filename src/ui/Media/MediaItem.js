import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import { faPlayCircle } from '@fortawesome/fontawesome-pro-light'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Image from './Image'
import Video from './Video'

const MediaItem = ({
  ratio,
  imageUrl,
  imageAlt,
  videoUrl,
  className,
  children,
  rounded,
  circle,
  showControls,
  playIcon
}) => {
  const showVideoControls = showControls && !children
  const [showPlayButton, setShowPlayButton] = useState(showVideoControls)
  const videoProps = showVideoControls
    ? {
      playsInline: false,
      autoPlay: false,
      loop: false,
      muted: false,
      controls: !showPlayButton,
    }
    : {}
  let videoRef = createRef()
  const playButtonClick = () => {
    videoRef.current.play()
    setShowPlayButton(false)
  }

  let rounding = rounded ? 'rounded' : ''
  if (circle) {
    ratio = '1by1'
    rounded = false
    rounding = 'rounded-circle'
  }

  // TODO : test where the showControls is passed in, but no value URL exists

  return (
    <div className={`embed-responsive embed-responsive-${ratio} ${rounding} ${className}`}>
      <Image source={imageUrl} alt={imageAlt} className='embed-responsive-item' />
      {videoUrl &&
        <Video
          className='embed-responsive-item'
          source={videoUrl}
          {...videoProps}
          ref={videoRef} />
      }

      {(children || (showPlayButton && videoUrl)) &&
        <div className='fill d-flex justify-content-center align-items-center'>
          {(showVideoControls && videoRef)
            ? (
              <button
                className="btn btn-icon"
                onClick={playButtonClick} >
                <FontAwesomeIcon icon={faPlayCircle} size={playIcon.size} color={playIcon.color} />
              </button>
            )
            : children}
        </div>}

    </div>
  )
};

const defaultProps = {
  ratio: '1by1',
  videoUrl: null,
  className: '',
  showControls: false,
  playIcon: {
    as: null,
    color: 'white',
    size: '3x',
  }
}

const propTypes = {
  ratio: PropTypes.oneOf(['1by1', '4by3', '16by9', '21by9']),
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
  className: PropTypes.string,
  showControls: PropTypes.bool,
  playIcon: PropTypes.shape({
    as: PropTypes.element, // TODO : add support
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  })
}

MediaItem.defaultProps = defaultProps;
MediaItem.propTypes = propTypes;

export default MediaItem;
