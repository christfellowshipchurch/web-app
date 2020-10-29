import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media } from '../../ui';

const BannerBackground = ({ title, coverImage }) => (
  <div className="p-absolute w-100 h-100 overflow-hidden" style={{ bottom: 50 }}>
    <Media
      imageUrl={get(coverImage, 'sources[0].uri', '')}
      imageAlt={`${title} - ${get(coverImage, 'name', '')}`}
      ratio={{ xs: '1by1', md: '16by9' }}
      forceRatio
      className="absolute-center"
      style={{ filter: 'blur(50px)', height: '150%', width: '150%' }}
    />
    <div className="fill bg-black opacity-30" />
  </div>
);

BannerBackground.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
};

BannerBackground.defaultProps = {
  title: '',
  coverImage: {},
};

export default BannerBackground;
