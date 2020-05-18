import React, { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import { Icon } from '../Icons';

const MediaVideo = ({ source, poster, isLive, showControls, playIcon }) => {
  const [showPlayButton, setShowPlayButton] = useState(showControls);

  let videoProps = showControls
    ? {
      playsInline: false,
      autoPlay: false,
      loop: false,
      muted: false,
      controls: !showPlayButton,
    }
    : {};

  if (isLive || source.includes('m3u8')) {
    videoProps = {
      ...videoProps,
      autoPlay: true,
      playsInline: true
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
    if (isLive) return playButtonClick()
  }, [videoRef])

  return (
    <div>
      <video
        {...videoProps} 
        poster={poster}
        ref={videoRef}
        controlsList="nodownload"
        style={{
          objectFit: 'cover'
        }}
      >
        <source  
          type='video/mp4' 
          src={source}
        />
      </video>
      {showPlayButton && 
        <div className="fill d-flex justify-content-center align-items-center" style={{ zIndex: 1000 }}>
              <button
                className="btn btn-icon"
                onClick={playButtonClick}
              >
                <Icon
                  name='play-circle' 
                  size={playIcon.size} 
                  fill={playIcon.color}
                />
              </button>
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
