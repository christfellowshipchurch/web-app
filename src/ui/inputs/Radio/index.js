import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from '../../Icons';

const parseValue = (n) => (typeof n === 'string' ? { label: n, value: n } : n);

const Checkbox = ({ options, onClick, type, error, value, label, ...buttonProps }) => {
  const types =
    typeof type === 'string' ? { default: type, hover: type, checked: type } : type;

  return (
    <div className={classnames('d-flex', 'flex-column')}>
      {label && (
        <div>
          <label className="mb-0">{label}</label>
        </div>
      )}
      <div className="ml-1">
        {options.map((n, i) => {
          const { label: radioLabel, value: radioValue } = parseValue(n);
          const checked = value === radioValue;

          return (
            <div key={i} className="text-left d-flex align-items-center">
              <a
                href="/#"
                onClick={(e) => {
                  e.preventDefault();
                  onClick(radioValue);
                }}
                className={classnames('btn-radio')}
                {...buttonProps}
              >
                <Icon
                  name={checked ? 'dot-circle' : 'circle'}
                  fill={checked ? types.checked : types.default}
                  size={22}
                />
              </a>

              {radioLabel && (
                <label
                  className={classnames(
                    'ml-3',
                    'pl-2',
                    'mb-0',
                    'input-label',
                    'text-dark'
                  )}
                >
                  {radioLabel}
                </label>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <div>
          <label className={classnames('ml-2', 'input-label-sm', 'text-danger')}>
            {error}
          </label>
        </div>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  ]),
  value: PropTypes.string,
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
};

Checkbox.defaultProps = {
  options: [],
  checked: false,
  onClick: () => true,
  type: {
    default: '#828282',
    hover: '#00aeff',
    checked: '#00aeff',
  },
  label: null,
};

export default Checkbox;
