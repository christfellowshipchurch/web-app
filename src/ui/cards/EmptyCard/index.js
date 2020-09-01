import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Loader } from '../..';

const EmptyCard = ({ children, className, style, shadow, fill, loading, error }) => (
  <div
    className={classnames(
      'card',
      'border-0',
      {
        [`shadow-${shadow}`]: shadow !== '',
        shadow: shadow === '',
      },
      className
    )}
    style={style}
  >
    <div className={`${fill ? '' : 'card-body'}`}>
      {loading && (
        <div className="p-3">
          <Loader />
        </div>
      )}
      {error && <h5 className="text-danger">There was an error loading this content</h5>}

      {!loading && !error && children}
    </div>
  </div>
);

EmptyCard.defaultProps = {
  className: '',
  style: {},
  shadow: '',
  loading: false,
  error: null,
};

EmptyCard.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  shadow: PropTypes.oneOf(['', 'sm', 'lg']),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default EmptyCard;
