import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { isString } from 'lodash';

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
  /* display: none; */
  padding: 0 ${baseUnit(2)} ${baseUnit(1)};
  border: none;
  background: none;
`;

const ThreeDotsIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'three-dots',
  fill: theme.font[700],
  size: 18,
}))``;

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

// :: Main Component
// ------------------------
const defaultOptions = [
  {
    label: 'Send a Direct Message',
    callback: (client, params) => {
      alert('Send a DM');
    },
  },
  {
    divider: true,
  },
  // {
  //   label: 'Mute User',
  //   callback: () => alert('Mute User'),
  // },
  {
    label: 'Delete Message',
    callback: () => alert('Delete Message'),
  },
  {
    label: 'Ban User',
    callback: () => alert('Ban User'),
  },
];

const MessageActionsDropdown = ({ options = defaultOptions }) => {
  const id = 'message-actions-indicator';

  const handleSelect = (key, e) => {
    e.preventDefault();
    const index = parseInt(key, 10);
    options[index].callback(e);
  };

  return (
    <Container>
      <Dropdown id={id} onSelect={handleSelect}>
        <Dropdown.Toggle variant="link" id={id} as={MessageActionsToggle}>
          Actions
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option, i) =>
            option.divider ? (
              <Dropdown.Divider />
            ) : (
              <Dropdown.Item key={`MessageActions:${i}`} eventKey={i} active={false}>
                {option.label}
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

MessageActionsDropdown.defaultProps = {
  // options: [],
};

export default MessageActionsDropdown;
