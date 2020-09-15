import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from '../../Icons';

const Checkbox = ({ checked, onClick, type, label, error, disabled, ...buttonProps }) => {
  const types =
    typeof type === 'string' ? { default: type, hover: type, checked: type } : type;

  if (disabled) {
    types.checked = 'dark';
    types.hover = 'dark';
  }

  return (
    <div className="text-left">
      <a
        href="/#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={classnames(
          'btn-checkbox',
          {
            disable: disabled,
          },
          {
            [`text-${types.default}`]: !checked,
            [`text-${types.checked}`]: checked,
          }
        )}
        {...buttonProps}
      >
        {/*
         * Replaced FontAwesome Icons with custom Icon component,
         * still need to clean up rest of Checkbox Component
         */}
        <Icon
          name={checked ? 'check-square' : 'square'}
          fill={checked ? types.checked : types.default}
        />
      </a>
      {error && (
        <label className={classnames('ml-2', 'input-label-sm', 'text-danger')}>
          {error}
        </label>
      )}
      {label && <label className={classnames('ml-2', 'input-label')}>{label}</label>}
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      default: PropTypes.string,
      hover: PropTypes.string,
      checked: PropTypes.string,
    }),
  ]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
  onClick: () => true,
  type: {
    default: '#353535',
    hover: '#00aeff',
    checked: '#00aeff',
  },
  label: null,
  disabled: false,
};

export default Checkbox;
