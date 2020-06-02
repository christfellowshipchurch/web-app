import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../ui/Icons'
import ProfileConnected from './AuthNavbar/ProfileConnected'


const MobileNav = ({
  links,
  auth: {
    isLoggedIn,
    logIn, 
    logout
  },
  navIcons
}) => {

  const mobileNavLinkClass = {
    div: classnames(
      'd-flex',
      'align-items-center',
      'mb-2',
    ),
    link: classnames(
      'p-2',
      'pl-3',
      'nav-link',
      'text-dark',
      'no-decoration'
    )
  }
 
  return <div className='d-lg-none'>
  <div
    className={classnames(
      'd-flex',
      'flex-column',
      'ml-4',
      'vh-100'
    )}
  >
    <div
      className={mobileNavLinkClass.div}
    >
      {isLoggedIn
        ? <ProfileConnected
          size={30}
          className='mr-n1'
        />
        : <Icon
          name='user-circle'
          size={24}
        />
      }
      <a
        href='/profile'
        className={mobileNavLinkClass.link}
      >
        {isLoggedIn
          ? 'Profile'
          : 'Sign In'
        }
      </a>
    </div>
    {links.map((link, i) => (
      <div
        key={i}
        className={mobileNavLinkClass.div}
      >
        {React.createElement(
          Icon,
          {
            name: navIcons[i],
          }
        )}
        <a
          href={link.action}
          className={mobileNavLinkClass.link}
        >
          {link.call}
        </a>
      </div>
    ))}
    {isLoggedIn &&
      <div
        className={mobileNavLinkClass.div}
      >
        <Icon
          name='sign-out'
          size={24}
        />
        <a
          className={mobileNavLinkClass.link}
          onClick={() => logout()}
          href='/'
        >
          Log Out
      </a>
      </div>
    }
  </div>
</div>
}

MobileNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })),
  auth: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    logIn: PropTypes.func, 
    logout: PropTypes.func
  }),
  navIcons: PropTypes.arrayOf(
    PropTypes.string
  )
}

MobileNav.defaultProps = {
  links: [],
  auth: {
    isLoggedIn: false,
    logIn: () => {},
    logout: () => {}
  },
  navIcons: [
    'book-alt',
    'search',
    'handshake',
    'users',
    'envelope-open-dollar',
    'mobile'
  ]
}

export default MobileNav
