import React from 'react';
import PropTypes from 'prop-types';
import { AngleLeft } from '../ui/Icons';

import { CardFeed } from '../content-feed';

const SeeAllCategory = ({ categoryId, title, onBack }) => {
  window.scrollTo(0, 0);

  return (
    <div className="container-fluid" style={{ minHeight: '100%' }}>
      <div className="row align-content-center mt-3 mb-n6">
        <a
          href="# "
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="h3 d-flex align-items-center"
        >
          <AngleLeft size="24" />
          {title}
        </a>
      </div>
      <div className="row px-n2">
        <CardFeed id={categoryId} />
      </div>
    </div>
  );
};

SeeAllCategory.propTypes = {
  category: PropTypes.string,
  categoryId: PropTypes.string,
  filter: PropTypes.string,
  onBack: PropTypes.func,
  title: PropTypes.string,
};

SeeAllCategory.defaultProps = {
  category: null,
  filter: null,
  onBack: () => true,
  title: null,
};

export default SeeAllCategory;
