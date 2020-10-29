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
const EmptyMessagesList = () => {
  return (
    <Container>
      <Blurb>
        No messages yet.
        <br />
        Be the first to share your thoughts!
      </Blurb>
    </Container>
  );
};

export default EmptyMessagesList;
