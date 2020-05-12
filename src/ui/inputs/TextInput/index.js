import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toLower, camelCase } from 'lodash';
import {
  ExclamationCircle,
  CheckCircle,
  Ban,
  User,
} from '../../Icons';

import InputContainer from '../inputContainer';
import InputIcon from '../inputIcon';

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
  hideIcon,
  readOnly,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const prefixColor = (focused || hovering) && !disabled
    ? '#00aeef'
    : disabled ? '#e6e6e6' : '#525252';
  let suffix = withSuccess
    ? { icon: CheckCircle, color: '#1ec27f' }
    : null;

  if (error) {
    suffix = { icon: ExclamationCircle, color: '#cb045b' };
  }

  if (disabled) {
    suffix = { icon: Ban, color: '#e6e6e6' };
  }
  const forLabel = toLower(camelCase(label));

  return (
    <InputContainer
      label={label}
      placeholder={placeholder}
      description={error && !disabled ? error : description}
      focused={readOnly ? false : focused || !!value}
      hasValue={!!value && value !== ''}
      prefix={!!icon && <InputIcon icon={icon} color={hideIcon ? 'transparent' : prefixColor} />}
      suffix={suffix && <InputIcon icon={suffix.icon} color={suffix.color} />}
    >
      <input
        id={forLabel}
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-100 py-0"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => { !readOnly && setHovering(true); }}
        onMouseLeave={() => { !readOnly && setHovering(false); }}
        onChange={(e) => onChange(e)}
        disabled={disabled || readOnly}
        {...inputProps}
      />
    </InputContainer>
  );
};

TextInput.defaultProps = {
  onChange: () => { },
  icon: User,
  hideIcon: false,
  readOnly: false,
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  icon: PropTypes.object,
  hideIcon: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default TextInput;
