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
  withHover,
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

  if (circle) {
    ratio = '1by1'
  }

  // TODO : test where the showControls is passed in, but no value URL exists

  return (
    <div
      className={classnames(
        className,
        'embed-responsive',
        {
          [`embed-responsive-${ratio}`]: true,
          'rounded': rounded && !circle,
          'rounded-circle': circle,
          'scale-media-up-on-hover': withHover
        }
      )}
    >
      <Image
        source={imageUrl}
        alt={imageAlt}
        className={classnames(
          'embed-responsive-item',
        )}
      />

      {videoUrl &&
        <Video
          className={classnames(
            'embed-responsive-item',
          )}
          source={videoUrl}
          {...videoProps}
          ref={videoRef}
          poster={imageUrl}
        />
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

    </div >
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
  },
  overlay: null,
  gradient: null,
  withHover: false,
}

const propTypes = {
  ratio: PropTypes.oneOf(['1by1', '4by3', '16by9', '21by9']),
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
  className: PropTypes.string,
  showControls: PropTypes.bool,
  withHover: PropTypes.bool,
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
  ])
}

MediaItem.defaultProps = defaultProps;
MediaItem.propTypes = propTypes;

export default MediaItem;
