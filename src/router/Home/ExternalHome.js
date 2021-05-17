/* eslint-disable import/no-unresolved */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { HeroSection } from 'ui';
import { useAuth } from '../../auth';

import backgroundVideo from './home-background-vid.mp4';

const CustomButton = ({ call, action, onClick }) => (
  <a
    className={classnames('mx-2', 'my-2', 'min-width-250', 'btn', 'btn-primary')}
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
      <CustomButton call="I'm New Here" action="/new-here" />
      <CustomButton call="I Attend CF" action="#login" onClick={() => logIn()} />
    </div>
  );

  return (
    <HeroSection
      title="Looking for more out of life? Church is a great place to start. "
      htmlContent="Christ Fellowship Church is helping thousands of people every week discover there’s more to life and that it’s easier to find than you think."
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
