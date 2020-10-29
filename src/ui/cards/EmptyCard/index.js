import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Loader } from '../..';

const EmptyCard = ({
  children,
  className,
  error,
  fill,
  loading,
  onClick,
  shadow,
  style,
}) => (
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
    onClick={onClick}
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
  error: null,
  fill: null,
  loading: false,
  onClick: null,
  shadow: '',
  style: {},
};

EmptyCard.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  fill: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  shadow: PropTypes.oneOf(['', 'sm', 'lg']),
  style: PropTypes.object,
};

export default EmptyCard;
