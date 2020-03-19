import React from 'react';
import PropTypes from 'prop-types';
import {
  get,
} from 'lodash';

import { Media } from '../../ui';

const EventBanner = ({
  coverImage,
}) => (
    <div className="p-relative">
      <div
        className="p-absolute w-100 h-100 overflow-hidden"
        style={{ bottom: 50 }}
      >
        <Media
          imageUrl={get(coverImage, 'sources[0].uri', '')}
          imageAlt={get(coverImage, 'name', 'bg blur')}
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
          imageAlt={get(coverImage, 'name', 'bg blur')}
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
  coverImage: PropTypes.any, // eslint-disable-line
};

export default EventBanner;
