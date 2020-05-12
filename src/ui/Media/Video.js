import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const MediaVideo = forwardRef((
  {
    source,
    ...videoProps
  }, ref,
) => {

  return (
      <video
            {...videoProps} 
            ref={ref}
            controlsList="nodownload"
          >
            <source  
              type='video/mp4' 
              src={source} 
            />
        </video>
  )});

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
