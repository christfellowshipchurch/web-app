import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import renamePropsWithWarning from 'react-deprecate';
import { get } from 'lodash';

const LOADER_COLORS = {
  dark: 'dark',
  light: 'light',
  primary: 'white',
};

const Button = ({
  className,
  color,
  gradient,
  loading,
  newTab,
  size,
  title,
  type,
  ...buttonProps
}) => {
  const btnType = get(
    {
      white: 'white',
      dark: 'outline-dark text-dark',
      light: 'outline-light text-light',
      link: 'link text-primary',
    },
    type,
    'primary text-white'
  );

  const buttonColor = color || btnType;
  const classes = classnames(
    'btn',
    `btn-${btnType}`,
    type !== 'link' ? 'text-uppercase' : '',
    size && `btn-${size}`,
    gradient && `bg-gradient-${buttonColor} border-${buttonColor}`,
    className
  );

  return (
    <a className={classes} target={newTab ? '_blank' : ''} {...buttonProps}>
      {loading ? (
        <div
          className={classnames(
            'spinner-border',
            `text-${get(LOADER_COLORS, type, 'primary')}`
          )}
          role="status"
          style={{
            width: '1rem',
            height: '1rem',
            borderWidth: 2,
          }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        title
      )}
    </a>
  );
};

Button.defaultProps = {
  className: '',
  color: null,
  gradient: false,
  loading: false,
  newTab: false,
  size: '',
  title: 'default',
  type: 'primary',
};

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  gradient: PropTypes.bool,
  loading: PropTypes.bool,
  newTab: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
};

export default renamePropsWithWarning(
  Button,
  { call: 'title', action: 'onClick' },
  ({ componentName, prop, renamedProps }) =>
    `${componentName} warning: ${prop} is deprecated and will be removed in future releases. Please use ${renamedProps}`
);
