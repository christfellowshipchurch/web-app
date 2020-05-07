import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  get,
} from 'lodash';

import { Media } from '../../ui';

const Banner = ({
  title,
  coverImage,
  videos,
  withShare,
  shareTitle,
}) => (
    <div className="p-relative">
      <div
        className="p-absolute w-100 h-100 overflow-hidden"
        style={{ bottom: 50 }}
      >
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

      <div className="max-width-1100 mx-auto px-3 pt-6">
        <Media
          imageUrl={get(coverImage, 'sources[0].uri', '')}
          videoUrl={get(videos[0], 'sources[0].uri', '')}
          imageAlt={`${title} - ${get(coverImage, 'name', '')}`}
          className="max-height-45-vh"
          ratio={{ xs: '1by1', md: '16by9' }}
          forceRatio
          rounded
          showControls
          className="shadow"
        />
      </div>
    </div>
  );

Banner.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  videos: PropTypes.arrayOf(PropTypes.shape({
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }))
};

Banner.defaultProps = {
  title: '',
  coverImage: {},
  videos: []
};

export default Banner;
