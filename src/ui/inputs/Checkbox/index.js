import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from '../../Icons';

const Checkbox = ({ checked, onClick, type, label, error, disabled, ...buttonProps }) => {
  const types =
    typeof type === 'string' ? { default: type, hover: type, checked: type } : type;

  if (!!disabled) {
    types.default = '#353535';
    types.checked = '#353535';
    types.hover = '#353535';
  }

  return (
    <div className={`text-left mb-1 ${disabled ? '' : 'cursor-hover'}`}>
      <Icon
        onClick={onClick}
        name={checked ? 'check-square' : 'square'}
        fill={checked ? types.checked : types.default}
        size={22}
      />
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
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Checkbox.defaultProps = {
  checked: false,
  onClick: () => true,
  type: {
    default: '#828282',
    hover: '#00aeff',
    checked: '#00aeff',
  },
  label: null,
  disabled: null,
  error: null,
};

export default Checkbox;
