import React, { createRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Hls from 'hls.js';
import { isMobile, isIOS } from 'react-device-detect';
import { useTheaterMode, toggleTheaterMode } from 'providers/TheaterModeProvider';

import { Icon } from '../Icons';

import { CenterPlayButton, ImagePlayButton } from './PlayButtons';

const VODMediaPlayer = ({
  source,
  poster,
  showControls,
  altPlayButton,
  showTheaterMode,
  playInBackground,
}) => {
  const [showPlayButton, setShowPlayButton] = useState(showControls);
  const [showMuteButton, setShowMuteButton] = useState(isMobile);
  const [played, setPlayed] = useState(false);
  const [theaterMode, dispatch] = useTheaterMode();

  const showTheaterButton = showTheaterMode;

  let videoProps = showControls
    ? {
        playsInline: false,
        autoPlay: false,
        loop: false,
        muted: false,
        controls: !showPlayButton,
      }
    : {
        autoPlay: playInBackground,
        loop: playInBackground,
        muted: playInBackground,
      };

  if (source.includes('m3u8') && !isMobile) {
    videoProps = {
      ...videoProps,
      autoPlay: true,
      playsInline: true,
      disablePictureInPicture: true,
    };
  }

  if (isMobile) {
    videoProps = {
      ...videoProps,
      muted: false,
      playsInline: true,
      showControls: false,
      autoPlay: false,
    };
  }

  const videoRef = createRef();

  const muteButtonClick = () => {
    setShowMuteButton(false);
    videoRef.current.muted = false;
  };

  const playButtonClick = useCallback(() => {
    const createHLSurl = () => {
      let hls = new Hls({});
      hls.loadSource(source);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    };

    if (source.includes('m3u8')) {
      createHLSurl();
    } else {
      videoRef.current.play();
    }
    setShowPlayButton(false);
  }, [source, videoRef]);

  useEffect(() => {
    if (isIOS) return playButtonClick();
  }, [videoRef, playButtonClick]);

  const handleToggleTheater = () => {
    dispatch(toggleTheaterMode());
  };

  return (
    <>
      <video
        className="rounded"
        {...videoProps}
        poster={poster}
        ref={videoRef}
        controlsList="nodownload"
        style={{
          objectFit: played && !playInBackground ? 'contain' : 'cover',
          backgroundColor: 'black',
        }}
        onPlay={() => setPlayed(true)}
      >
        <source type="video/mp4" src={source} />
      </video>
      {showPlayButton && (
        <div>
          {altPlayButton ? (
            <CenterPlayButton onClick={playButtonClick} />
          ) : (
            <ImagePlayButton onClick={playButtonClick} image={poster} />
          )}
        </div>
      )}
      {showMuteButton && (
        <div
          className="fill d-flex justify-content-center align-items-center"
          style={{ zIndex: 1000 }}
        >
          <h4
            className={classnames('card', 'bg-dark', 'p-1', 'text-white')}
            onClick={muteButtonClick}
          >
            Tap to Unmute
          </h4>
        </div>
      )}
      {showTheaterButton && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '0.75rem',
            cursor: 'pointer',
          }}
        >
          <Icon
            name={theaterMode ? 'minimize' : 'maximize'}
            fill={'white'}
            size={16}
            onClick={handleToggleTheater}
          />
        </div>
      )}
    </>
  );
};

VODMediaPlayer.propTypes = {
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
VODMediaPlayer.defaultProps = {
  className: '',
  playsInline: true,
  autoPlay: true,
  loop: true,
  muted: true,
  altPlayButton: false,
  playInBackground: false,
  showTheaterMode: false,
};

export default VODMediaPlayer;
