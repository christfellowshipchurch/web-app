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

const SubHeading = styled.strong``;

const Blurb = styled.p`
  width: 80%;
  color: ${({ theme }) => theme.font.destructive};
  text-align: center;
`;

// :: Main Component
// ------------------------
const ChatError = () => {
  return (
    <Container>
      <Blurb>
        <SubHeading>Oops!</SubHeading>
        <br />
        Something went wrong.
        <br />
        Please refresh and try again.
      </Blurb>
    </Container>
  );
};

export default ChatError;
