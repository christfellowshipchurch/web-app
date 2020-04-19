import React, { useState } from 'react'
import { Query, useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import classnames from 'classnames'
import { toLower, get, has, find, camelCase } from 'lodash'

import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import {
  Bars,
  Times,
  Users,
  Handshake,
  CalendarAlt,
  EnvelopeOpenDollar,
  Search,
} from '../../ui/Icons'

import { useAuth } from '../../auth'
import { GET_WEBSITE_HEADER_LOGGED_IN, GET_PROFILE_IMAGE } from '../queries'
import ProfileConnected from './ProfileConnected'
import ContactUsButton from './ContactUsButton'
import LiveBanner from '../LiveBanner'


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
  navIcons,
  learnMoreLinks
}) => {
  const { logout } = useAuth()

  const [menuIcon, setMenuIcon] = useState(false)
  const website = process.env.REACT_APP_WEBSITE_KEY
  const { data } = useQuery(GET_WEBSITE_HEADER_LOGGED_IN, {
    variables: { website },
    fetchPolicy: "cache-and-network"
  })

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
          <LiveBanner/>
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
          {React.createElement(
            menuIcon ? Times : Bars,
            {
              fill:"#525252",
              size:'lg',
            }
          )}
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

          {/* Mobile Profile */}
          <div className='d-lg-none'>
            <div
              style={{ flex: 1 }}
              className={classnames(
                "d-flex",
                "justify-content-start",
                "justify-content-lg-end",
                'py-0'
              )}
            >
              <ProfileConnected />
            </div>
          </div>

          <hr className='d-lg-none w-75' />
         <div className='d-flex align-items-center'>
          <Nav>
            {/* Desktop NavLinks */}
            {navLinks.map((link, i) => (
              <Nav.Link
                key={i}
                href={link.action}
                className={classnames(
                  'mx-3',
                  'my-2',
                  'd-none d-lg-block',
                  'nav-link',
                  'text-dark'
                )}
              >
                {link.call}
              </Nav.Link>
            ))}

            {/* Mobile NavLinks */}
            <p className={classnames(
              'font-weight-light',
              'd-lg-none',
              'ml-2',
              'mb-2'
            )}
            >
              Get Involved
            </p>
            {navLinks.map((link, i) => (
              <div
                key={i}
                className={classnames(
                  'd-flex',
                  'align-items-center',
                  'd-lg-none',
                  'pl-2',
                  'ml-3',
                )}
              >
                {React.createElement(
                  navIcons[i],
                  {
                    fill: 'black'
                  }
                )}
                <Nav.Link
                  href={link.action}
                  className={classnames(
                    'pl-2',
                    'text-dark'
                  )}
                >
                  {link.call}
                </Nav.Link>
              </div>
            ))}
          </Nav>


          {/* Desktop Profile */}
          <div className='d-none d-lg-block'>
            <div
              style={{ flex: 1 }}
              className={classnames(
                "d-flex",
                "justify-content-start",
                "justify-content-lg-end",
              )}
            >
              <ProfileConnected
                dropDownLinks={learnMoreLinks}
              />
            </div>
          </div>
          </div>  
          <hr className='d-lg-none w-75' />     
          {/* Mobile Learn More */}
          <div className='d-lg-none'>
            <p className={classnames(
              'font-weight-light',
              'ml-2',
              'my-1'
            )}>
              Learn More
              </p>
            <div
              className={classnames(
                'd-flex',
                'flex-column',
                'ml-3',
              )}
            >
              {learnMoreLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.action}
                  className={classnames(
                    'p-2',
                    'nav-link',
                    'text-dark',
                    'no-decoration'
                  )}
                >
                  {link.call}
                </a>
              ))}
              {/* Contact Us Button */}
              <ContactUsButton
                className={classnames(
                  'p-2',
                  'nav-link',
                  'text-dark',
                  'no-decoration'
                )}
              >
                Contact Us
              </ContactUsButton>
            </div>
          </div>
          <hr className='d-lg-none w-75' />
          <a
            href="#"
            className={classnames(
              'p-1',
              'nav-link',
              'text-dark',
              'd-lg-none',
              'ml-3',
              'mb-5'
            )}
            onClick={(e) => {
              e.preventDefault()
              logout()
            }}
          >
            Logout
          </a>

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
    })),
  navIcons: PropTypes.array,
  learnMoreLinks: PropTypes.arrayOf(
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
    { call: 'Content', action: '/browse' },
    { call: 'Events', action: '/events' },
    { call: 'Serve', action: 'https://rock.gocf.org/dreamteam' },
    { call: 'Community', action: '/community-finder' },
    { call: 'Give', action: 'https://pushpay.com/g/christfellowship' },
  ],
  navIcons: [
    Search,
    CalendarAlt,
    Handshake,
    Users,
    EnvelopeOpenDollar,
  ],
  learnMoreLinks: [
    { call: 'About Christ Fellowship', action: '/about-page' },
    { call: 'Church Locations', action: '/locations' },
    { call: 'Request Prayer', action: 'https://gochristfellowship.com/new-here/contact-us/' },
  ]
}

export default NavbarConnected
