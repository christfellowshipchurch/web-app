import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useScrollPosition } from '../hooks';
import Navbar from './index';

const NavbarWithOpacity = ({ offset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState('transparent');

  useScrollPosition(({ currPos }) => {
    const opaque = currPos.y > -1 * offset;

    setBgColor(opaque ? 'transparent' : 'dark');
  });

  return (
    <Navbar
      bg={isOpen ? 'dark' : bgColor}
      variant="dark"
      brandImageKey="brandImageAlt"
      onToggle={() => {
        setIsOpen(!isOpen);
      }}
      onSelect={() => setIsOpen(false)}
      fixed
    />
  );
};

NavbarWithOpacity.propTypes = {
  offset: PropTypes.number,
};

NavbarWithOpacity.defaultProps = {
  offset: 50,
};

export default NavbarWithOpacity;
