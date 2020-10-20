import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media } from 'ui';

const GroupImage = ({ coverImage, title }) => (
  <Media
    imageUrl={get(coverImage, 'sources[0].uri', '')}
    imageAlt={`${title} - ${get(coverImage, 'name', '')}`}
    ratio={{ xs: '1by1', md: '16by9' }}
    forceRatio
  />
);

GroupImage.propTypes = {
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  title: PropTypes.string,
};

export default GroupImage;
