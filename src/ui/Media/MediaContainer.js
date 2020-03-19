import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { keys } from 'lodash';
import { faPlayCircle } from '@fortawesome/fontawesome-pro-light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MediaItem from './MediaItem';

const MediaContainer = ({
  children,
  style,
  className,
  mediaItemStyles,
  forceRatio,
  ...mediaItemProps
}) => {
  if (!children || children.length === 0 || forceRatio) {
    return (
      <MediaItem
        {...mediaItemProps}
        className={className}
        style={{ ...style, ...mediaItemStyles }}
        children={forceRatio ? children : null}
      />
    );
  }

  return (
    <div
      style={style}
      className={classnames(
        'overflow-hidden',
        'p-relative',
        className,
      )}
    >
      <MediaItem
        {...mediaItemProps}
        className="fill"
        style={{ zIndex: 0, ...mediaItemStyles }}
      />
      {children}
    </div>
  );
};

MediaContainer.defaultProps = {
  style: {},
  mediaItemStyles: {},
  className: '',
  forceRatio: false,
};

MediaContainer.propTypes = {
  style: PropTypes.object,
  mediaItemStyles: PropTypes.object,
  className: PropTypes.string,
  forceRatio: PropTypes.bool,
};

export default MediaContainer;
