import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MediaItem from './MediaItem';

const MediaContainer = ({
  children,
  style,
  className,
  mediaItemStyles,
  forceRatio,
  fill,
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
    <div style={style} className={classnames('overflow-hidden', 'p-relative', className)}>
      <MediaItem
        {...mediaItemProps}
        className={fill && 'fill'}
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
  fill: true,
};

MediaContainer.propTypes = {
  style: PropTypes.object,
  mediaItemStyles: PropTypes.object,
  className: PropTypes.string,
  forceRatio: PropTypes.bool,
  fill: PropTypes.bool,
};

export default MediaContainer;
