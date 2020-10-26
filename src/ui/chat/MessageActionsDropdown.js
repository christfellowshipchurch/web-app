import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Dropdown } from 'react-bootstrap';

import { baseUnit } from 'styles/theme';

import { Icon } from 'ui';

// :: Styled Components
// ------------------------

const Container = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
`;

const ActionsButton = styled.button`
  padding: 0 ${baseUnit(2)} ${baseUnit(1)};
  border: none;
  background: none;
`;

const ThreeDotsIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'three-dots',
  fill: theme.font[700],
  size: 18,
}))``;

const OptionLabel = styled.span`
  ${({ theme, destructive }) => (destructive ? `color: ${theme.font.destructive};` : '')}
`;

const MessageActionsToggle = React.forwardRef(({ onClick }, ref) => (
  <ActionsButton
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <ThreeDotsIcon />
  </ActionsButton>
));
MessageActionsToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// :: Main Component
// ------------------------

const MessageActionsDropdown = ({ options }) => {
  const id = 'message-actions-indicator';

  const handleSelect = (key, e) => {
    e.preventDefault();
    const index = parseInt(key, 10);
    options[index].callback(e);
  };

  return (
    <Container>
      <Dropdown id={id} onSelect={handleSelect}>
        <Dropdown.Toggle variant="link" id={id} as={MessageActionsToggle} />
        <Dropdown.Menu>
          {options.map((option, i) =>
            option.divider ? (
              <Dropdown.Divider key={`MessageActions:${i}`} />
            ) : (
              <Dropdown.Item key={`MessageActions:${i}`} eventKey={i} active={false}>
                <OptionLabel destructive={option.destructive}>{option.label}</OptionLabel>
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

MessageActionsDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      callback: PropTypes.func,
    })
  ),
};

MessageActionsDropdown.defaultProps = {};

export default MessageActionsDropdown;
