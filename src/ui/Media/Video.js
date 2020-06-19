import React, { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import Hls from 'hls.js';
import { isMobile, isIOS } from 'react-device-detect'

import { Icon } from '../Icons';

const MediaVideo = ({ source, poster, isLive, showControls, playIcon }) => {
  const [showPlayButton, setShowPlayButton] = useState(showControls);
  const [showMuteButton, setShowMuteButton] = useState(isMobile && isLive);

  let videoProps = showControls
    ? {
      playsInline: false,
      autoPlay: false,
      loop: false,
      muted: false,
      controls: !showPlayButton,
    }
    : {};

  if (isLive || (source.includes('m3u8') && !isMobile)) {
    videoProps = {
      ...videoProps,
      autoPlay: true,
      playsInline: true
    }
  }

  if(isMobile){
    videoProps = {
      ...videoProps,
      muted: isLive,
      playsInline: true,
      showControls: false,
      autoPlay: isLive
    }
  }

  const videoRef = createRef();

  const createHLSurl = () => {
    let hls = new Hls({});
    hls.loadSource(source);
    hls.attachMedia(videoRef.current);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoRef.current.play()
    })
  }

  const muteButtonClick = () => {
    setShowMuteButton(false)
    videoRef.current.muted = false
  }

  const playButtonClick = () => {
    if(source.includes('m3u8')){
      createHLSurl()
    }
    else{
      videoRef.current.play();
    }
    setShowPlayButton(false);
  };

  useEffect(() => {
    if (isLive || isIOS) return playButtonClick()
  }, [videoRef])

  return (
    <div>
      <video
        className='rounded'
        {...videoProps} 
        poster={poster}
        ref={videoRef}
        controlsList="nodownload"
        style={{
          objectFit: 'cover',
        }}
      >
        <source  
          type='video/mp4' 
          src={source}
        />
      </video>
      {showPlayButton &&
        <div className="fill d-flex justify-content-start align-items-end" style={{ zIndex: 900 }}>
              <a
                className={classnames(
                  'cursor-hover',
                  'scale-media-up-on-hover',
                  'ml-3',
                  'd-flex',
                  'align-items-center',
                  'justify-content-center'
                )}
                onClick={playButtonClick}
                style={{
                  position: 'relative',
                  top: 20
                }}
              >
                <img
                  className='rounded gradient-black'
                  src={poster}
                  style={{
                    height: 60,
                    width: 'auto',
                    zIndex: 950
                  }}
                />
                <div
                  className='p-absolute flex-column'
                  style={{
                    zIndex: 1000
                  }}
                >
                  <Icon
                    className='d-flex justify-content-center'
                    name='play'
                    fill='white'
                    size={20}
                  />
                  <p
                    className='text-white mb-0'
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Play
                  </p>
                </div>
              </a>
        </div>
      }
      {showMuteButton &&
        <div
          className="fill d-flex justify-content-center align-items-center" 
          style={{ zIndex: 1000 }}
        >
          <h4
            className={classnames(
              'card',
              'bg-dark',
              'p-1',
              'text-white'
            )}
            onClick={muteButtonClick}
          >
            Tap to Unmute
          </h4>
        </div>
      }
    </div>
  )};

// Default state of the video is to be a silent,
//  inline, looped video to be used like a background video
const defaultProps = {
  className: '',
  playsInline: true,
  autoPlay: true,
  loop: true,
  muted: true,
};

const propTypes = {
  className: PropTypes.string,
  source: PropTypes.string.isRequired,
  playsInline: PropTypes.bool,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
};

MediaVideo.defaultProps = defaultProps;
MediaVideo.propTypes = propTypes;

export default MediaVideo;
