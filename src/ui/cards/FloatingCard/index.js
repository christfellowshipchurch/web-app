import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from '../../Icons';

const FloatingCard = ({ children, overlay, bodyClassNames, onPressExit }) => (
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
        <button className="border-0 bg-white" onClick={onPressExit}>
          <Icon name="times" size={30} />
        </button>
      </div>
      <div className={`card-body ${bodyClassNames || 'px-4 pt-0 pb-4'}`}>{children}</div>
    </div>
  </div>
);

FloatingCard.propTypes = {
  overlay: PropTypes.oneOf(['dark', 'light', 'white']),
  bodyClassNames: PropTypes.string,
  onPressExit: PropTypes.func,
};

FloatingCard.defaultProps = {
  overlay: 'dark',
  onPressExit: PropTypes.func,
};

export default FloatingCard;
