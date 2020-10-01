import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media } from '../../../ui';

const EventBannerBackground = ({ title, coverImage }) => (
  <div className="p-absolute w-100">
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

    {/*
      TODO:
      This is a "fake" or invisible component that needs to match the output dimensions of the
      EventMedia component... create a placeholder export version so this isn't repeated
      un-intuitively in two places.
    */}
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8">
          <div className="max-width-1100 mx-auto pt-3 pt-md-4 invisible">
            <Media
              imageUrl={get(coverImage, 'sources[0].uri', '')}
              imageAlt={`${title} - ${get(coverImage, 'name', '')}`}
              className="max-height-45-vh"
              ratio={{ xs: '16by9' }}
              forceRatio
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

EventBannerBackground.propTypes = {
  children: PropTypes.node,
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
};

EventBannerBackground.defaultProps = {
  title: '',
  coverImage: {},
  videos: [],
};

export default EventBannerBackground;
