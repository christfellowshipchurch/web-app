import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { Icon } from 'ui';

// :: Styled Components
// ------------------------

const Container = styled.div`
  position: relative;
  min-width: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  margin-top: 0.2rem;
  background-color: ${({ theme }) => theme.body.background};
  border-radius: ${({ size }) => size}px;
  overflow: hidden;
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-image: ${({ image }) => `url(${image})}`};
  background-size: cover;
`;

const FallbackIcon = styled(Icon).attrs(({ theme, size }) => ({
  name: 'user-circle',
  fill: theme.font[300],
  size,
}))``;

// :: Main Component
// ------------------------

const ChatAvatar = React.memo(({ image, size }) => (
  <Container size={size}>
    <FallbackIcon size={size} />
    {image && <Image image={image} size={size} />}
  </Container>
));

ChatAvatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.number,
};

ChatAvatar.defaultProps = {
  size: 42,
};

export default ChatAvatar;
