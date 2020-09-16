import React from 'react';
import styled from 'styled-components/macro';
import { MessageInput, MessageInputSmall } from 'stream-chat-react';

import { baseUnit } from 'styles/theme';
import { useAuth } from 'auth';

// :: Styled Components
const LoggedInContainer = styled.div`
  background-color: ${({ theme }) => theme.card.background};
`;

const LoggedOutContainer = styled.p`
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
  const { isLoggedIn, logIn } = useAuth();

  if (isLoggedIn) {
    return (
      <LoggedInContainer>
        <MessageInput Input={MessageInputSmall} noFiles />
      </LoggedInContainer>
    );
  }

  return (
    <LoggedOutContainer>
      <LoginLink onClick={logIn}>Log in</LoginLink> to chat with the community
    </LoggedOutContainer>
  );
};

export default MessageInputLoggedOut;
