import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import {
  faExclamationCircle,
  faCheckCircle,
  faBan,
  faUser,
  faAngleDown,
  faAngleUp
} from "@fortawesome/pro-light-svg-icons"

import InputContainer from '../inputContainer'
import InputIcon from '../inputIcon'

const Dropdown = ({
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
  options,
  ...selectProps
}) => {
  const [focused, setFocused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const color = (focused || hovering) && !disabled
    ? '#00aeef'
    : disabled ? '#e6e6e6' : '#525252'
  const suffix = focused ? faAngleUp : faAngleDown


  return (
    <InputContainer
      label={label}
      placeholder={placeholder}
      description={error && !disabled ? error : description}
      focused={focused || !!inputValue}
      hasValue={true}
      prefix={<InputIcon icon={icon} color={color} />}
      suffix={suffix && <InputIcon icon={suffix} color={color} />}
    >
      <select
        value={value}
        className="w-100 py-0"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onChange={(e) => { setInputValue(e.target.value); onChange(e) }}
        disabled={disabled}
        {...selectProps}
      >
        {options.map((n, i) => {
          const value = get(n, 'value', n)
          const label = get(n, 'label', n)

          return (
            <option
              value={value}
              key={i}
            >
              {label}
            </option>
          )
        })}
      </select>
    </InputContainer>
  )
}

Dropdown.defaultProps = {
  onChange: () => { },
  icon: faUser,
  options: []
}

Dropdown.propTypes = {
  onChange: PropTypes.func,
  icon: PropTypes.object,

  // Options allow an array of:
  //  strings: where the value and label are the same
  //  objects: { value, label } to distinguish the label from the value
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      }),
      PropTypes.string
    ])
  ),
}

export default Dropdown