import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useAuth } from '../auth';
import ProfileConnected from './ProfileConnected';

const MobileNav = ({ navLinks, quickAction, isDark }) => {
  const { isLoggedIn, logout } = useAuth();
  const mobileNavLinkClass = {
    div: classnames('d-flex', 'align-items-center', 'mb-2'),
    link: classnames(
      'p-2',
      'pl-3',
      'nav-link',
      {
        'text-dark': !isDark,
        'text-white': isDark,
      },
      'no-decoration'
    ),
  };

  return (
    <div className="d-lg-none">
      <div className={classnames('d-flex', 'flex-column', 'ml-3', 'vh-100', 'pt-4')}>
        <div className={classnames('d-flex', 'align-items-center', 'pl-3')}>
          <ProfileConnected size={30} isDark={isDark} />

          <a
            className={classnames(
              'p-2',
              'nav-link',
              {
                'text-dark': !isDark,
                'text-white': isDark,
              },
              'no-decoration'
            )}
            href="/profile"
          >
            {isLoggedIn ? 'Profile' : 'Sign In'}
          </a>
        </div>

        <hr className="w-75 mx-3" />

        {quickAction && (
          <div className="pl-3">
            <a
              href={quickAction.action}
              style={{ letterSpacing: 'normal' }}
              className={classnames('btn', 'btn-primary', 'px-3', 'py-2', 'mb-3', 'mt-1')}
            >
              {quickAction.call}
            </a>
          </div>
        )}

        {navLinks.map((link, i) => (
          <div key={i} className={mobileNavLinkClass.div}>
            <a href={link.action} className={mobileNavLinkClass.link}>
              {link.call}
            </a>
          </div>
        ))}

        {isLoggedIn && (
          <>
            <hr className="w-75 mx-3" />
            <div className={mobileNavLinkClass.div}>
              <a className={mobileNavLinkClass.link} onClick={() => logout()} href="/">
                Log Out
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

MobileNav.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })
  ),
  quickAction: PropTypes.shape({
    call: PropTypes.string,
    action: PropTypes.string,
  }),
  isDark: PropTypes.bool,
};

MobileNav.defaultProps = {
  navLinks: [],
  quickAction: [],
  isDark: false,
};

export default MobileNav;
