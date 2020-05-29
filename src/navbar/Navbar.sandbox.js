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
  navbarLinks,
  navIcons,
  dropDownLinks,
  quickAction
}) => {
  const { logout, logIn, isLoggedIn } = useAuth()
  const [menuIcon, setMenuIcon] = useState(false)
  const website = process.env.REACT_APP_WEBSITE_KEY
  const { loading, error, data } = useQuery(GET_WEBSITE_HEADER_LOGGED_IN, {
    variables: { website },
    fetchPolicy: "cache-and-network"
  })

  dropDownLinks = get(data, 'getWebsiteNavigation.navigationLinks', [])

  //Add 'Profile' link if logged in and desktop view
  if(isLoggedIn 
      && !includes(dropDownLinks[0].call, 'Profile')
      && !includes(navIcons, 'user-circle')
      && !isMobile
    ) {
    dropDownLinks.unshift({call: 'Profile', action: '/profile'})
    navIcons.unshift('user-circle')
  }

  if(isMobile && !includes(dropDownLinks[dropDownLinks.length - 1], 'Download App')){
    dropDownLinks.push({call: 'Download App', action:`${isIOS ? 'https://apps.apple.com/us/app/christ-fellowship-app/id785979426': 'https://play.google.com/store/apps/details?id=com.subsplash.thechurchapp.s_BSVMPR&hl=en_US'}`})
  }

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

  const dropDownIcon = ( isOpen ) => <Icon name={isOpen ? 'times' : 'bars'} fill="#525252"/>

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
          <DynamicBanner/>
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
           {/* Desktop Navbar Links */}
           {navbarLinks.map((link, i) => (
              <Nav.Link
                key={i}
                href={link.action}
                className={classnames(
                  'mx-2',
                  'my-2',
                  'd-none d-lg-block',
                  'nav-link',
                  'text-dark'
                )}
              >
                {link.call}
              </Nav.Link>
            ))} 
     
            {quickAction &&
              <Nav.Link
                href={quickAction.action}
                className={classnames(
                  'mx-4',
                  'mx-lg-2',
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
                  className='d-none d-lg-block mx-3'
                />
              : <Nav.Link
                  className='d-none d-lg-block'
                  onClick={() => logIn()}
                >
                  <Icon 
                    name='user-circle' 
                    fill='#525252'
                    size={32}
                  /> 
                </Nav.Link> 
            }

          {/* Desktop Dropdown Links */}
             {dropDownLinks.length > 1 && 
             <NavDropdown 
                className='d-none d-lg-block'
                title={dropDownIcon(menuIcon)}
                onToggle={() => setMenuIcon(!menuIcon)} 
                onSelect={() => setMenuIcon(!menuIcon)} 
                alignRight 
                id="collasible-nav-dropdown"
              >
              {dropDownLinks.map((link, i) => (
                  <Nav.Link
                    key={i}
                    href={link.action}
                    className={classnames(
                      'mx-3',
                      'my-2',
                      'nav-link',
                      'text-dark'
                    )}
                  >
                    {link.call}
                  </Nav.Link>
                ))}
              <hr className='mx-2 my-n1'/>
              <Nav.Link
                key='Login Button'
                className={classnames(
                  'mx-3',
                  'my-2',
                  'nav-link',
                  'text-dark'
                )}
                onClick={
                  () => isLoggedIn
                    ? logout() 
                    : logIn()
                }
              >
                {isLoggedIn
                  ? 'Log Out'
                  : 'Login'
                }
              </Nav.Link>
              </NavDropdown>}
          </div>  
          {/* Mobile Links */}
          <div className='d-lg-none'>
            <div
              className={classnames(
                'd-flex',
                'flex-column',
                'ml-4',
                'vh-100'
              )}
            >
              {isLoggedIn
                ? <div
                    className={classnames(
                      'd-flex',
                      'align-items-center',
                      'my-3'
                    )}
                    >
                    <ProfileConnected />
                    <a
                      href='/profile'
                      className={classnames(
                        'p-2',
                        'pl-3',
                        'nav-link',
                        'text-dark',
                        'no-decoration'
                      )}
                    >
                      My Profile
                    </a>
                  </div>
                : <div
                    className={classnames(
                      'd-flex',
                      'align-items-center',
                      'my-2'
                    )}
                    onClick={() => 
                      logIn()
                    }
                  >
                    <Icon 
                      name='user-circle' 
                      size={24}
                    /> 
                    <a 
                      className={classnames(
                        'p-2',
                        'pl-3',
                        'nav-link',
                        'text-dark',
                        'no-decoration'
                      )}
                    >
                      Sign In
                    </a>
                  </div> 
              }
              {dropDownLinks.map((link, i) => (
                <div
                  key={i}
                  className={classnames(
                    'd-flex',
                    'align-items-center',
                    'mb-2'
                  )}
                >
                {React.createElement(
                  Icon,
                  {
                    name: navIcons[i],
                  }
                )}
                <a
                  href={link.action}
                  className={classnames(
                    'p-2',
                    'pl-3',
                    'nav-link',
                    'text-dark',
                    'no-decoration'
                  )}
                >
                  {link.call}
                </a>
                </div>
              ))}
              {isLoggedIn &&
                <div
                  className={classnames(
                    'd-flex',
                    'align-items-center',
                    'mb-2',
                    'pl-1'
                  )}
                >
                  <Icon
                    name='sign-out'
                    size={22}
                  />
                  <a
                    className={classnames(
                      'p-2',
                      'pl-3',
                      'nav-link',
                      'text-dark',
                      'no-decoration'
                    )}
                    onClick={() => logout()}
                  >
                    Log Out
                  </a>
                </div>
              }
            </div>
          </div>

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
  navbarLinks: PropTypes.arrayOf(
    PropTypes.shape({
      call: PropTypes.string,
      action: PropTypes.string,
    })),
  navIcons: PropTypes.array,
  dropDownLinks: PropTypes.arrayOf(
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
  navbarLinks: [
    // { call: 'Content', action: '/browse' },
    // { call: 'Events', action: '/events' },
    // { call: 'Serve', action: 'https://rock.gocf.org/dreamteam' },
    // { call: 'Community', action: '/community-finder' },
    // { call: 'Give', action: 'https://pushpay.com/g/christfellowship' },
  ],
  navIcons: [
    'book-alt',
    'search',
    'handshake',
    'users',
    'envelope-open-dollar',
    'mobile'
  ],
  dropDownLinks: [
    { call: 'About Christ Fellowship', action: '/about-page' },
    { call: 'Church Locations', action: '/locations' },
    { call: 'Request Prayer', action: 'https://gochristfellowship.com/new-here/contact-us/' },
  ],
}

export default NavbarConnected
