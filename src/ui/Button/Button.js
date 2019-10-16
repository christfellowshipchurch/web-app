import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import renamePropsWithWarning from 'react-deprecate'
import { get } from 'lodash'


const LOADER_COLORS = {
  primary: 'white',
  dark: 'dark',
  light: 'light',
}

const Button = ({
  size,
  type,
  color,
  gradient,
  title,
  className,
  loading,
  ...buttonProps
}) => {
  const btnType = get({
    dark: 'outline-dark',
    light: 'outline-light',
    link: 'link'
  }, type, 'primary')

  const classes = classnames(
    'btn',
    size !== '' ? `btn-${size}` : '',
    `btn-${btnType}`,
    gradient ? `bg-gradient-${color ? color : btnType} border-${color ? color : btnType}` : '',  
    type !== 'link' ? 'text-uppercase' : '',
    className
  )

  return (
    <button
      className={classes}
      {...buttonProps}
    >
      {loading
        ? (
          <div
            className={classnames(
              "spinner-border",
              `text-${get(LOADER_COLORS, type, 'primary')}`             
            )}
            role="status"
            style={{
              width: '1rem',
              height: '1rem',
              borderWidth: 2
            }}
          >
            <span className="sr-only">Loading...</span>
          </div>
        )
        : title}
    </button>
  )
}

Button.defaultProps = {
  size: '',
  type: 'primary',
  title: 'default',
  className: '',
  loading: false
}

Button.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool
}


export default renamePropsWithWarning(
  Button,
  { call: 'title', action: 'onClick' },
  ({ componentName, prop, renamedProps }) => `${componentName} warning: ${prop} is deprecated and will be removed in future releases. Please use ${renamedProps}`
)