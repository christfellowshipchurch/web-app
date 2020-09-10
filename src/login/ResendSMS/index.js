import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';

import { REQUEST_PIN } from '../mutations';

const ResendSMS = ({ children, phoneNumber, requestedPrompt, requestedDelay }) => {
  const [requestPin] = useMutation(REQUEST_PIN);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (requested) {
      setInterval(() => {
        setRequested(false);
      }, requestedDelay);
    }
  }, [requested]);

  return requested ? (
    <p>{requestedPrompt}</p>
  ) : (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();

        setRequested(true);
        requestPin({
          variables: { phoneNumber },
        });
      }}
    >
      {children}
    </a>
  );
};

ResendSMS.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  requestedPrompt: PropTypes.string,
  requestedDelay: PropTypes.number,
};

ResendSMS.defaultProps = {
  requestedPrompt: 'Your new code is on the way!',
  requestedDelay: 5000,
};

export default ResendSMS;
