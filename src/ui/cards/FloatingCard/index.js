import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Times } from '../../Icons';

const FloatingCard = ({ children, overlay, onPressExit }) => (
  <div
    className={classnames('p-fixed', 'vw-100', 'vh-100', 'overflow-y-scroll')}
    style={{
      zIndex: 1000,
      top: 0,
      left: 0,
    }}
  >
    <div
      className={classnames(
        'p-fixed',
        'w-100',
        'h-100',
        'bg-dark',
        'opacity-65',
        `bg-${overlay}`
      )}
    ></div>
    <div
      className={classnames('card', 'floating-card')}
      style={{
        maxWidth: 600,
        width: '90%',
      }}
    >
      <div
        className={classnames(
          'card-header',
          'bg-white',
          'text-right',
          'border-0',
          'sticky-top'
        )}
      >
        <button className="border-0" onClick={onPressExit}>
          <Times />
        </button>
      </div>
      <div className="card-body px-4 pt-0 pb-4">{children}</div>
    </div>
  </div>
);

FloatingCard.defaultProps = {
  overlay: 'dark',
};

FloatingCard.propTypes = {
  overlay: PropTypes.oneOf(['dark', 'light', 'white']),
};

export default FloatingCard;
