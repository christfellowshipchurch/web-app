import React, { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import PropTypes from 'prop-types';
import Navbar from './index';

const NavbarWithOpacity = ({ offset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState('transparent');

  // Change Navbar color on ScrollPosition,
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
