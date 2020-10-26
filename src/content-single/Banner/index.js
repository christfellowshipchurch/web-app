import React from 'react';
import PropTypes from 'prop-types';
import BannerBackground from './BannerBackground';
import BannerMain from './BannerMain';

export const BannerContainer = ({ children }) => (
  <div className="p-relative">{children}</div>
);

const Banner = ({ title, coverImage, videos, liveStreamSource }) => (
  <BannerContainer>
    <BannerBackground title={title} coverImage={coverImage} />
    <BannerMain
      title={title}
      coverImage={coverImage}
      liveStreamSource={liveStreamSource}
      videos={videos}
    />
  </BannerContainer>
);

Banner.propTypes = {
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

Banner.defaultProps = {
  title: '',
  coverImage: {},
  videos: [],
  liveStreamSource: '',
};

export default Banner;
