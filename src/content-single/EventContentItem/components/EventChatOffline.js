import React from 'react';
import styled from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

// :: Styled Components
// ------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: ${baseUnit(3)};
`;

const Blurb = styled.p`
  width: 80%;
  text-align: center;
`;

// :: Main Component
// ------------------------
const EventChatOffline = () => {
  return (
    <Container>
      <h4>Stay Tuned!</h4>
      <Blurb>You can chat with the community when this event goes live.</Blurb>
    </Container>
  );
};

export default EventChatOffline;
