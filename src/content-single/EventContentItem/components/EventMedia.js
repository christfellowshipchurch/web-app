import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media } from 'ui';

const EventMedia = ({ title, coverImage, videos, liveStreamSource }) => (
  <div className="mb-2">
    <Media
      imageUrl={get(coverImage, 'sources[0].uri', '')}
      videoUrl={
        !!liveStreamSource && liveStreamSource !== ''
          ? liveStreamSource
          : get(videos, '[0].sources[0].uri', '')
      }
      isLive={!!liveStreamSource && liveStreamSource !== ''}
      imageAlt={`${title} - ${get(coverImage, 'name', '')}`}
      className="max-height-45-vh shadow"
      ratio={{ xs: '16by9' }}
      forceRatio
      rounded
      showControls
    />
  </div>
);

EventMedia.propTypes = {
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

EventMedia.defaultProps = {
  title: '',
  coverImage: {},
  videos: [],
};

export default EventMedia;
