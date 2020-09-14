import React from 'react';
import styled from 'styled-components/macro';

import { baseUnit } from 'styles/config';
import { useAuth } from 'auth';

// :: Styled Components
const Container = styled.p`
  position: relative;
  width: 100%;
  padding: ${baseUnit(2)};
  margin-top: ${baseUnit(2)};
  margin-bottom: 0;
  text-align: center;
  background: ${({ theme }) => theme.card.background};
  box-shadow: 0 -${baseUnit(3)} ${baseUnit(4)} ${({ theme }) => theme.body.background};
`;

const LoginLink = styled.button`
  color: ${({ theme }) => theme.link};
  background: none;
  border: none;
  padding: 0;
`;

// :: Main Component
const MessageInputLoggedOut = () => {
  const { logIn } = useAuth();

  return (
    <Container>
      <LoginLink onClick={logIn}>Log in</LoginLink> to chat with the community
    </Container>
  );
};

export default MessageInputLoggedOut;
