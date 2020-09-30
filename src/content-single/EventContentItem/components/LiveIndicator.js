import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

import { Icon } from 'ui/Icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${baseUnit(2)};
`;

// Create the keyframes
const blink = keyframes`
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.1;
    }

    100% {
      opacity: 1;
    }
  `;

const LiveDot = styled(Icon).attrs(({ theme }) => ({
  name: 'live-dot',
  fill: theme.liveEvent,
  size: 8,
}))`
  display: flex;
  align-items: center;
  animation: ${blink} 2.5s ease-in-out infinite;
`;

const Label = styled.h4`
  color: ${({ theme }) => theme.font.destructive};
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 0;
  margin-left: ${baseUnit(1)};
`;

// :: Styled Components
// ------------------------

const LiveIndicator = ({ isLive }) => {
  if (!isLive) {
    return null;
  }

  return (
    <Container>
      <LiveDot />
      <Label>LIVE NOW</Label>
    </Container>
  );
};
LiveIndicator.propTypes = {
  isLive: PropTypes.bool,
};

LiveIndicator.defaultProps = {
  isLive: false,
};

export default LiveIndicator;
