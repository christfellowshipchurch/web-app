import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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
  playIcon,
  overlay,
  gradient,
  style,
  fill
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

  const imgRatio = `embed-responsive-${ratio}`

  const classNames = {
    container: classnames(
      className,
      {
        'vw-100': fill === 'screen',
        'vh-100': fill === 'screen',
      }
    ),
    mediaContainer: classnames(
      'embed-responsive',
      imgRatio,
      {
        'embed-responsive-1by1': circle,
        'rounded-circle': circle,
        'rounded': rounded,
        'absolute-center': !!fill,
        'w-100': !!fill,
        'h-100': !!fill,
      }),
  }

  // TODO : test where the showControls is passed in, but no value URL exists

  return (
    <div
      className={classNames.container}
      style={style}
    >
      <div className={classNames.mediaContainer}>
        <Image source={imageUrl} alt={imageAlt} className='embed-responsive-item' />
        {videoUrl &&
          <Video
            className='embed-responsive-item'
            source={videoUrl}
            {...videoProps}
            ref={videoRef} />
        }

        {/* TODO : add gradient abilities */}
        {(gradient || overlay) &&
          <div
            className={classnames(
              'w-100',
              'h-100',
              'absolute-center',
              'opacity-65',
              {
                [`bg-${overlay}`]: !!overlay,
                [`bg-gradient-${gradient}`]: !!gradient
              }
            )}
          ></div>
        }
      </div>

      {
        (children || (showPlayButton && videoUrl)) &&
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
        </div>
      }
    </div>
  )
}

MediaItem.defaultProps = {
  ratio: '1by1',
  videoUrl: null,
  className: '',
  style: {},
  showControls: false,
  playIcon: {
    as: null,
    color: 'white',
    size: '3x',
  },
  overlay: null,
  gradient: null,
  fill: null,
  circle: false
}

MediaItem.propTypes = {
  ratio: PropTypes.oneOf(['1by1', '4by3', '16by9', '21by9']),
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  showControls: PropTypes.bool,
  playIcon: PropTypes.shape({
    as: PropTypes.element, // TODO : add support
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }),
  overlay: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark"
  ]),
  gradient: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark"
  ]),
  fill: PropTypes.oneOf(['container', 'screen']),
}

export default MediaItem
