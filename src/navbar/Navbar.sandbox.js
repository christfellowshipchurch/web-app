import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isMobile, isIOS } from 'react-device-detect'
import { get, includes, camelCase } from 'lodash'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { Icon } from '../ui/Icons'
import { useAuth } from '../auth'

import { GET_WEBSITE_HEADER_LOGGED_IN, GET_PROFILE_IMAGE } from './queries'
import ProfileConnected from './AuthNavbar/ProfileConnected'
import DynamicBanner from './DynamicBanner'
import DesktopNav from './DesktopNav.sandbox'
import MobileNav from './MobileNav.sandbox'

// Takes a collection of images from the API's return data and formats
//  it to be an array of the following object structure: { imageKey: { uri, alt } }
const imageArrayToObject = (images) => {
  let imagesObj = {}

  images.forEach((n, i) => {
    const key = camelCase(get(n, 'name', i))
    const uri = get(n, 'sources[0].uri', '')
    const alt = get(n, 'name', 'Christ Fellowship Church')

    imagesObj[key] = { uri, alt }
  })

  return imagesObj
}

const BrandImg = ({
  className,
  uri,
  alt
}) =>
  <Navbar.Brand
    href="/"
    className={classnames(
      "align-self-start",
      className
    )}
  >
    <img
      src={uri}
      style={{ height: '58px', width: 'auto' }}
      alt={alt}
    />
  </Navbar.Brand>

const NavbarConnected = ({
  bg,
  variant,
  brandImageKey,
  onToggle,
  fixed,
  navLinks,
  quickAction
}) => {
  const { logout, logIn, isLoggedIn } = useAuth()
  const [menuIcon, setMenuIcon] = useState(false)
  const website = process.env.REACT_APP_WEBSITE_KEY
  const { loading, error, data } = useQuery(GET_WEBSITE_HEADER_LOGGED_IN, {
    variables: { website },
    fetchPolicy: "cache-and-network"
  })

  navLinks = get(data, 'getWebsiteNavigation.navigationLinks', [])
  quickAction = get(data, 'getWebsiteNavigation.quickAction', null)

  const images = imageArrayToObject(get(data, 'getWebsiteNavigation.images', []))
  const brandImage = get(images, brandImageKey, null)
  const navbarProps = {
    bg,
    variant,
    expand: 'lg'
  }

  // We use sticky styling as the default so that padding is respected
  //    with the option to override it to use a fixed styling if preferred
  if (fixed) navbarProps.fixed = "top"
  else navbarProps.sticky = "top"

  const dropDownIcon = (isOpen) => 
    <Icon 
      name={isOpen ? 'times' : 'bars'} 
      fill="#525252" 
    />

  return (
    <Navbar
      {...navbarProps}
      id="user-profile-navbar-connected"
      className={classnames(
        'd-flex',
        'flex-column',
        'p-0'
      )}
    >

      <div className='row w-100'>
        <DynamicBanner />
      </div>

      <div
        className={classnames(
          'row',
          'w-100',
          'd-flex',
          'justify-content-between'
        )}
      >
        {/* Mobile Brand Image */}
        {brandImage &&
          <BrandImg
            uri={brandImage.uri}
            alt={brandImage.alt}
            className="d-lg-none p-2"
          />
        }

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={onToggle}
          className="border-0"
        >
          <span
            onClick={() => setMenuIcon(!menuIcon)}
            className='mr-2'
          >
            {dropDownIcon(menuIcon)}
          </span>
        </Navbar.Toggle>


        <Navbar.Collapse>
          <div
            className={classnames(
              'd-flex',
              'flex-column',

              'flex-lg-row',
              'justify-content-lg-between',
              "align-items-lg-center",

              'w-100',
              "px-lg-3",
            )}
          >

            {/* Desktop Brand Image */}
            <div>
              {brandImage &&
                <BrandImg
                  uri={brandImage.uri}
                  alt={brandImage.alt}
                  className={classnames(
                    'd-none',
                    'd-lg-block',
                    'pl-4'
                  )}
                />
              }
            </div>

            <div className='d-flex align-items-center'>

              {quickAction &&
                <Nav.Link
                  href={quickAction.action}
                  className={classnames(
                    'mx-lg-2',
                    'mx-4',
                    'my-2',
                    'px-3',
                    'btn-primary',
                    'nav-link',
                    'text-white',
                    'rounded'
                  )}
                >
                  {quickAction.call}
                </Nav.Link>
              }
              {isLoggedIn
                ? <ProfileConnected 
                    className='d-none d-lg-block ml-2 mr-1'
                  />
                : 
                  <Icon
                    onClick={() => logIn()}
                    className='d-none d-lg-block ml-2 mr-1'
                    name='user-circle'
                    fill='#525252'
                    size={32}
                  />
              }

              <DesktopNav
                links={navLinks}
                auth={{
                  isLoggedIn: isLoggedIn,
                  logIn: () => logIn(),
                  logout: () => logout()
                }}
              /> 
            </div>

            <MobileNav
              links={navLinks}
              auth={{
                isLoggedIn: isLoggedIn,
                logIn: () => logIn(),
                logout: () => logout()
              }}
            />
                
         
          </div> 
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

NavbarConnected.propTypes = {
  bg: PropTypes.string,
  variant: PropTypes.string,
  brandImageKey: PropTypes.string,
  fixed: PropTypes.bool,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    }))
}

NavbarConnected.defaultProps = {
  bg: 'white',
  variant: 'light',
  brandImageKey: 'brandImage',
  fixed: false,
  navLinks: [
    { call: 'About Christ Fellowship', action: '/about-page' },
    { call: 'Church Locations', action: '/locations' },
    { call: 'Request Prayer', action: 'https://gochristfellowship.com/new-here/contact-us/' },
  ],
}

export default NavbarConnected
