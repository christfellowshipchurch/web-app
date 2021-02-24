import React from 'react';
import { isMobile } from 'react-device-detect';

import FilterButtons from './FilterButtons';
import FilterModal from './FilterModal';

const BrowseFilters = (props = {}) => {
  return isMobile ? <FilterModal {...props} /> : <FilterButtons {...props} />;
};

export default BrowseFilters;
