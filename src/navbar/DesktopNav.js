import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { includes } from 'lodash';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Icon } from '../ui/Icons';
import { useAuth } from '../auth';

import ProfileConnected from './ProfileConnected';

const NavLink = ({ link, onClick }) => (
  <Nav.Link
    href={link.action}
    className={classnames(
      'mx-3',
      'my-2',
      'nav-link',
      'text-dark',
    )}
    onClick={onClick}
  >
    {link.call}
  </Nav.Link>
);

const dropDownIcon = (isOpen, isDark) => (
  <Icon
    name={isOpen ? 'times' : 'bars'}
    fill={isDark ? '#ffffff' : '#525252'}
  />
);

const DesktopNav = ({
  navLinks,
  menuLinks,
  quickAction,
  isDark
}) => {
  const { logout, logIn, isLoggedIn } = useAuth();
  const [menuIcon, setMenuIcon] = useState(false);

  return (
    <div className="d-none d-lg-flex align-items-center">
      {navLinks.map((link, i) => (
        <Nav.Link
          key={`${link.call}${i}`}
          href={link.action}
          className={classnames(
            'p-3',
            'nav-link',
            {
              'text-dark': !isDark,
              'text-white': isDark
            }
          )}
        >
          {link.call}
        </Nav.Link>
      ))}
      {quickAction
        && (
          <Nav.Link
            href={quickAction.action}
            className={classnames(
              'mx-lg-3',
              'mx-4',
              'my-2',
              'px-3',
              'btn-primary',
              'nav-link',
              'text-white',
              'rounded',
            )}
          >
            {quickAction.call}
          </Nav.Link>
        )}

      <ProfileConnected
        className="d-none d-lg-block ml-2 mr-1 btn-like"
        isDark={isDark}
      />

      <NavDropdown
        title={dropDownIcon(menuIcon, isDark)}
        onToggle={() => setMenuIcon(!menuIcon)}
        onSelect={() => setMenuIcon(!menuIcon)}
        alignRight
        id="collasible-nav-dropdown"
      >
        {isLoggedIn
          && (
            <NavLink
              link={{
                call: 'Profile',
                action: '/profile',
              }}
            />
          )}
        {menuLinks.map((link, i) => (
          <NavLink
            key={`${link.call}${i}`}
            link={link}
          />
        ))}
        <hr className="mx-2" />
        <NavLink
          onClick={
            () => (isLoggedIn
              ? logout()
              : logIn())
          }
          link={{
            call: isLoggedIn
              ? 'Log Out'
              : 'Login',
          }}
        />
      </NavDropdown>
    </div>
  );
};

DesktopNav.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    }),
  ),
  menuLinks: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    }),
  ),
  quickAction: PropTypes.shape({
    call: PropTypes.string,
    action: PropTypes.string,
  }),
  isDark: PropTypes.bool
};

DesktopNav.defaultProps = {
  navLinks: [],
  menuLinks: [],
  quickAction: [],
  isDark: false
};

export default DesktopNav;
