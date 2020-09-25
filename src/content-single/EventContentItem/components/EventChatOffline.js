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
  width: 75%;
  text-align: center;
`;

// :: Main Component
// ------------------------
const EventChatOffline = () => {
  return (
    <Container>
      <h4>Stay Tuned!</h4>
      <Blurb>
        Event is not live yet. It will go live at [start date and time].
        <br />
        <br />
        [Add to Calendar CTA?]
      </Blurb>
    </Container>
  );
};

export default EventChatOffline;
