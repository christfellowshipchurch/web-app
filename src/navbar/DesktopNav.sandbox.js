import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { includes } from 'lodash'
import { Icon } from '../ui/Icons'
import { Nav, NavDropdown } from 'react-bootstrap'

const NavLink = ({link, onClick}) => (
  <Nav.Link
      href={link.action}
      className={classnames(
        'mx-3',
        'my-2',
        'nav-link',
        'text-dark'
      )}
      onClick={onClick}
    >
    {link.call}
  </Nav.Link>)

const dropDownIcon = (isOpen) => 
  <Icon 
    name={isOpen ? 'times' : 'bars'} 
    fill="#525252" 
  />


const DesktopNav = ({
  links,
  auth: {
    isLoggedIn,
    logIn, 
    logout
  }
}) => {
  const [menuIcon, setMenuIcon] = useState(false)


  return (
    <NavDropdown
      className='d-none d-lg-block'
      title={dropDownIcon(menuIcon)}
      onToggle={() => setMenuIcon(!menuIcon)}
      onSelect={() => setMenuIcon(!menuIcon)}
      alignRight
      id="collasible-nav-dropdown"
    >
      {isLoggedIn &&
        <NavLink
          link={{
            call: 'Profile',
            action: '/profile'
          }}
        />
      }
      {links.map((link, i) => 
        <NavLink
          key={i}
          link={link}
        />
      )}
      <hr className='mx-2' />
      <NavLink
        onClick={
          () => isLoggedIn
            ? logout()
            : logIn()
        }
        link={{
          call: isLoggedIn
          ? 'Log Out'
          : 'Login'
        }}
      />
    </NavDropdown>
  )}

  DesktopNav.propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        call: PropTypes.string,
        action: PropTypes.string,
      })),
    auth: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
      logIn: PropTypes.func, 
      logout: PropTypes.func
    })
  }
  
  DesktopNav.defaultProps = {
    links: [],
    auth: {
      isLoggedIn: false,
      logIn: () => {},
      logout: () => {}
    }
  }

export default DesktopNav
