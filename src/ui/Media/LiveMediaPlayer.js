import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Hls from 'hls.js';
import { isMobile } from 'react-device-detect';
import { useTheaterMode, toggleTheaterMode } from 'providers/TheaterModeProvider';

import { Icon } from '../Icons';

const LiveMediaPlayer = ({
  source,
  poster,
  showControls,
  showTheaterMode,
  playInBackground,
  playerRef = React.createRef(),
}) => {
  const [showMuteButton, setShowMuteButton] = useState(isMobile);
  const [theaterMode, dispatch] = useTheaterMode();

  const showTheaterButton = showTheaterMode;

  const muteButtonClick = () => {
    setShowMuteButton(false);
    playerRef.current.muted = false;
  };

  let videoProps = showControls
    ? {
        playsInline: false,
        autoPlay: false,
        loop: false,
        muted: false,
        controls: true,
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

  useEffect(() => {
    if (!source) return;

    let hls = null;

    function _initPlayer() {
      if (hls != null) {
        hls.destroy();
      }

      const newHls = new Hls({
        enableWorker: false,
      });

      newHls.attachMedia(playerRef.current);

      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(source);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          const video = playerRef.current;
          var isPlaying =
            video.currentTime > 0 &&
            !video.paused &&
            !video.ended &&
            video.readyState > 2;

          if (!isPlaying) {
            video.play();
          }
        });
      });

      newHls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      hls = newHls;
    }

    _initPlayer();

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [playerRef, source]);

  const handleToggleTheater = () => {
    dispatch(toggleTheaterMode());
  };

  return (
    <>
      <video
        className={'rounded'}
        style={{
          objectFit: 'contain',
          backgroundColor: 'black',
        }}
        poster={poster}
        ref={playerRef}
        {...videoProps}
      ></video>
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

LiveMediaPlayer.propTypes = {
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
LiveMediaPlayer.defaultProps = {
  className: '',
  playsInline: true,
  autoPlay: true,
  loop: true,
  muted: true,
  altPlayButton: false,
  playInBackground: false,
  showTheaterMode: false,
};

export default LiveMediaPlayer;
