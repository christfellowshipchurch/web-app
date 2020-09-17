import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';

import { Icon } from '../ui/Icons';

const NavbarToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar.Toggle
      aria-controls="basic-navbar-nav"
      onClick={() => setIsOpen(!isOpen)}
      className="border-0"
    >
      <span className="mr-2">
        <Icon name={isOpen ? 'times' : 'bars'} fill="#525252" />
      </span>
    </Navbar.Toggle>
  );
};

NavbarToggle.propTypes = {};

NavbarToggle.defaultProps = {};

export default NavbarToggle;
