import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import TopSwoopSVG from '../../images/top_swoop.svg';
import BottomSwoopSVG from '../../images/bottom_swoop.svg';

const svgMap = {
  top: TopSwoopSVG,
  bottom: BottomSwoopSVG,
};

const Swoop = ({ type }) => (
  <div className={classnames()}>
    <img
      src={svgMap[type]}
      className={classnames('swoop', {
        'swoop-top': type === 'top',
        'swoop-bottom': type === 'bottom',
      })}
    />
  </div>
);

Swoop.propTypes = {
  type: PropTypes.oneOf(['top', 'bottom']),
};

export default Swoop;
