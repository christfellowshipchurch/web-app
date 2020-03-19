import React from 'react';
import PropTypes from 'prop-types';

import Img from 'react-image';
import Loaders from '../Loader';

const MediaImage = ({ className, source, alt }) => (
  <Img
    src={source}
    alt={alt}
    className={className}
    loader={<Loaders />}
  />
);

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

MediaImage.propTypes = propTypes;
MediaImage.defaultProps = defaultProps;

export default MediaImage;
