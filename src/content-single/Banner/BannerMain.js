import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media } from '../../ui';

const BannerMain = ({ title, coverImage, videos, liveStreamSource }) => (
  <div className="max-width-1100 mx-auto px-3 pt-6">
    <Media
      imageUrl={get(coverImage, 'sources[0].uri', '')}
      videoUrl={
        !!liveStreamSource && liveStreamSource !== ''
          ? liveStreamSource
          : get(videos, '[0].sources[0].uri', '')
      }
      isLive={!!liveStreamSource && liveStreamSource !== ''}
      imageAlt={`${title} - ${get(coverImage, 'name', '')}`}
      className="shadow"
      ratio={{ xs: '1by1', md: '16by9' }}
      forceRatio
      rounded
      showControls
    />
  </div>
);

BannerMain.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
    })
  ),
  liveStreamSource: PropTypes.string,
};

BannerMain.defaultProps = {
  title: '',
  coverImage: {},
  videos: [],
  liveStreamSource: '',
};

export default BannerMain;
