/* eslint-disable import/no-unresolved */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { HeroSection, Button } from 'ui';
import { useAuth } from '../../auth';

import backgroundVideo from './home-background-vid.mp4';

const CustomButton = ({ call, action, onClick, outline }) => (
  <a
    className={classnames(
      'mx-2',
      'my-2',
      'min-width-250',
      'btn',
      outline ? 'outline-light text-light border-light' : 'btn-primary'
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
  type: PropTypes.string,
};

CustomButton.defaultProps = {
  action: '#',
  call: '',
  onClick: null,
  type: 'primary',
};

const ExternalHome = () => {
  const { logIn } = useAuth();

  const customPrimaryButtons = (
    <div className="my-6">
      <CustomButton call="Learn More" action="/new-here" />
      <CustomButton call="I Attend CF" action="#login" outline onClick={() => logIn()} />
    </div>
  );

  return (
    <HeroSection
      title="Looking for more out of life?"
      htmlContent="Church is a great place to start. Christ Fellowship Church is helping thousands of people every week discover there’s more to life and that it’s easier to find than you think."
      video={{
        uri: backgroundVideo,
      }}
      swoop={false}
    >
      {customPrimaryButtons}
    </HeroSection>
  );
};

ExternalHome.propTypes = {};

ExternalHome.defaultProps = {};

export default ExternalHome;
