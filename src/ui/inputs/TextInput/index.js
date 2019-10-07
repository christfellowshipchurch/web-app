import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  faExclamationCircle,
  faCheckCircle,
  faBan,
  faUser,
} from "@fortawesome/pro-light-svg-icons"

import InputContainer from '../inputContainer'
import InputIcon from '../inputIcon'

const TextInput = ({
  label,
  helper,
  placeholder,
  disabled,
  description,
  error,
  success,
  onChange,
  withSuccess,
  value,
  icon,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const prefixColor = (focused || hovering) && !disabled
    ? '#00aeef'
    : disabled ? '#e6e6e6' : '#525252'
  let suffix = withSuccess
    ? { icon: faCheckCircle, color: '#1ec27f' }
    : null

  if (error) {
    suffix = { icon: faExclamationCircle, color: '#cb045b' }
  }

  if (disabled) {
    suffix = { icon: faBan, color: '#e6e6e6' }
  }

  return (
    <InputContainer
      label={label}
      placeholder={placeholder}
      description={error && !disabled ? error : description}
      focused={focused || !!inputValue}
      hasValue={!!inputValue && inputValue !== ''}
      prefix={<InputIcon icon={icon} color={prefixColor} />}
      suffix={suffix && <InputIcon icon={suffix.icon} color={suffix.color} />}
    >
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-100 py-0"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onChange={(e) => { setInputValue(e.target.value); onChange(e) }}
        disabled={disabled}
        {...inputProps} />
    </InputContainer>
  )
}

TextInput.defaultProps = {
  onChange: () => { },
  icon: faUser
}

TextInput.propTypes = {
  onChange: PropTypes.func,
  icon: PropTypes.object
}

export default TextInput