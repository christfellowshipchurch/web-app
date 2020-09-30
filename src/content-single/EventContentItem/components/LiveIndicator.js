import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

import { Icon } from 'ui/Icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${baseUnit(2)};
`;

const LiveDot = styled(Icon).attrs(({ theme }) => ({
  name: 'live-dot',
  fill: theme.liveEvent,
  size: 8,
}))`
  display: flex;
  align-items: center;
`;

const Label = styled.h4`
  color: ${({ theme }) => theme.font.destructive};
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 0;
  margin-left: ${baseUnit(2)};
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
