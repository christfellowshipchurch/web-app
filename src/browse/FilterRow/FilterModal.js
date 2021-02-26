import React, { useState } from 'react';
import classnames from 'classnames';
import { FloatingCard } from 'ui';

import FilterButtons from './FilterButtons';

const FilterModal = (props = {}) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className={classnames('d-flex', 'flex-column', 'align-items-left', 'mb-n4')}>
      <h5
        onClick={() => setShowFilters(true)}
        className="text-primary font-weight-normal"
      >
        Change Category
      </h5>
      <h1 className="text-secondary">{props?.selected?.title}</h1>
      {showFilters && (
        <FloatingCard onPressExit={() => setShowFilters(false)}>
          <FilterButtons onClick={() => setShowFilters(false)} {...props} />
        </FloatingCard>
      )}
    </div>
  );
};

export default FilterModal;
