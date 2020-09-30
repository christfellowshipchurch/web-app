import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { MessageInput, MessageInputSmall } from 'stream-chat-react';

import { baseUnit } from 'styles/theme';
import { useAuth } from 'auth';

import { Icon } from 'ui';

// :: Styled Components
const LoggedInContainer = styled.div`
  background-color: ${({ theme }) => theme.card.background};
`;

const LoggedOutContainer = styled.p`
  position: relative;
  width: 100%;
  padding: ${baseUnit(2)};
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

const SendButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  padding: 0;
  background: ${({ theme }) => theme.brand};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
`;

const SendIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'paper-airplane',
  fill: theme.brandForeground,
  size: 20,
}))`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SendButtonComponent = ({ sendMessage }) => (
  <SendButton onClick={sendMessage}>
    <SendIcon />
  </SendButton>
);
SendButtonComponent.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

// :: Main Component
const MessageInputLoggedOut = () => {
  const { isLoggedIn, logIn } = useAuth();

  if (isLoggedIn) {
    return (
      <LoggedInContainer>
        <MessageInput
          Input={MessageInputSmall}
          SendButton={SendButtonComponent}
          noFiles
          publishTypingEvent={false}
        />
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
