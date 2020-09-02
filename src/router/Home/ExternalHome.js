/* eslint-disable import/no-unresolved */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { HeroSection } from 'ui';
import { useAuth } from '../../auth';

import backgroundImage from './home-background.jpg';

const CustomButton = ({ call, action, onClick }) => (
  <a
    className={classnames(
      'mx-2',
      'my-2',
      'min-width-250',
      'btn',
      'btn-primary',
    )}
    href={action}
    onClick={onClick}
  >
    {call}
  </a>
);

CustomButton.propTypes = {
  call: PropTypes.string,
  action: PropTypes.string,
  onClick: PropTypes.func,

};

CustomButton.defaultProps = {
  action: '#',
  call: '',
  onClick: null,
};

const ExternalHome = () => {
  const { logIn } = useAuth();

  const customPrimaryButtons = (
    <div className="my-6">
      <CustomButton
        call="I'm New Here"
        action="/new"
      />
      <CustomButton
        call="I Attend CF"
        action="#login"
        onClick={() => logIn()}
      />
    </div>
  );

  return (
    <HeroSection
      title="Live Your Best Life"
      htmlContent="A church in South Florida that helps you thrive in every area of life."
      image={{
        uri: backgroundImage,
      }}
      swoop={false}
    >
      {customPrimaryButtons}
    </HeroSection>
  );
};


ExternalHome.propTypes = {
};

ExternalHome.defaultProps = {
};

export default ExternalHome;
