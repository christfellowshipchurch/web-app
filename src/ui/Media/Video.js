import React from 'react';
import PropTypes from 'prop-types';

import LiveMediaPlayer from './LiveMediaPlayer';
import VODMediaPlayer from './VODMediaPlayer';

const MediaVideo = ({ isLive, ...props }) => {
  return isLive ? <LiveMediaPlayer {...props} /> : <VODMediaPlayer {...props} />;
};

MediaVideo.propTypes = {
  className: PropTypes.string,
  source: PropTypes.string.isRequired,
  playsInline: PropTypes.bool,
  poster: PropTypes.string,
  autoPlay: PropTypes.bool,
  isLive: PropTypes.bool,
  showControls: PropTypes.bool,
  showTheaterMode: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  altPlayButton: PropTypes.bool,
  playInBackground: PropTypes.bool,
};

// Default state of the video is to be a silent,
//  inline, looped video to be used like a background video
MediaVideo.defaultProps = {
  className: '',
  playsInline: true,
  autoPlay: true,
  loop: true,
  muted: true,
  altPlayButton: false,
  playInBackground: false,
  showTheaterMode: false,
};

export default MediaVideo;
