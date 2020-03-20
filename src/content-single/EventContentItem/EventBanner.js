import React from 'react';
import PropTypes from 'prop-types';
import {
  get,
} from 'lodash';

import { Media } from '../../ui';

const EventBanner = ({
  title,
  coverImage,
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

      <div className="max-width-800 mx-auto px-3 pt-6">
        <Media
          imageUrl={get(coverImage, 'sources[0].uri', '')}
          imageAlt={`${title} - ${get(coverImage, 'name', '')}`}
          className="max-height-45-vh"
          ratio={{ xs: '1by1', md: '16by9' }}
          forceRatio
          rounded
          className="shadow"
        />
      </div>
    </div>
  );

EventBanner.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
};

EventBanner.defaultProps = {
  title: '',
  coverImage: {},
};

export default EventBanner;
