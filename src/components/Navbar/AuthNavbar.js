import React, { useState } from 'react'
import { Query, useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import classnames from 'classnames'
import { toLower, get, has, find, camelCase } from 'lodash'

import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-pro-light'
import { Media } from '@christfellowshipchurch/web-ui-kit'

import { useAuth, useAuthQuery } from '../../auth'

const GET_WEBSITE_HEADER = gql`
  query websiteNavigation($website:String!) {
    getWebsiteNavigation(website:$website) {
      images {
        sources {
          uri
        }
        name
      }
    }
  }
`

const GET_PROFILE_IMAGE = gql`
  query {
    currentUser {
      profile {
        firstName
        photo {
          uri
        }
      }
    }
  }
`

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
      style={{ height: '40px', width: 'auto' }}
      alt={alt}
    />
  </Navbar.Brand>

const ProfileConnected = () => {
  const { logout } = useAuth()
  const { loading, error, data } = useAuthQuery(GET_PROFILE_IMAGE)

  if (has(data, 'currentUser.profile')) return (
    <div
      className={classnames(
        'd-flex',
        'align-items-center'
      )}
    >
      <div className="text-right">
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
          >
            {get(data, 'currentUser.profile.firstName')}
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="text-right"
          >
            <Dropdown.Item
              href="#"
              onClick={() => logout()}
            >
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {get(data, 'currentUser.profile.photo.uri', '') !== ''
        ? (
          <div style={{ width: 48, height: 48 }}>
            <Media
              imageUrl={get(data, 'currentUser.profile.photo.uri', '')}
              imageAlt={`Christ Fellowship Church - ${get(data, 'currentUser.profile.firstName')}`}
              ratio="1by1"
              circle
            />
          </div>
        )
        : <i className="fal fa-user-circle fa-2x"></i>
      }
    </div>
  )

  // log out on error

  if (loading) return <i className="fal fa-user-circle fa-2x"></i>
}

const NavbarConnected = ({
  bg,
  variant,
  brandImageKey,
  onToggle,
  fixed,
  links,
}) => {

  const website = process.env.REACT_APP_WEBSITE_KEY
  const { data } = useQuery(GET_WEBSITE_HEADER, {
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
    >
      {brandImage &&
        <BrandImg
          uri={brandImage.uri}
          alt={brandImage.alt}
          className="d-lg-none"
        />
      }

      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={onToggle}
        className="border-0">
        <FontAwesomeIcon icon={faBars} size="1x" />
      </Navbar.Toggle>

      <Navbar.Collapse>
        <div
          className={classnames(
            'd-flex',
            'flex-row',
            'justify-content-between',
            "align-items-center",
            'w-100',
            "px-lg-3"
          )}
        >
          <div style={{ flex: 1 }}>
            {brandImage &&
              <BrandImg
                uri={brandImage.uri}
                alt={brandImage.alt}
                className={"d-none d-lg-block"}
              />
            }
          </div>

          <Nav
            style={{ flex: 1 }}
            className={classnames(
              "align-items-center",
              'justify-content-center'
            )}
          >
            {links.map((link, i) => (
              <Nav.Link
                key={i}
                href={link.action}
                className={classnames(
                  'mx-3',
                  'font-weight-normal'
                )}
              >
                {link.call}
              </Nav.Link>
            ))}
          </Nav>

          <div
            style={{ flex: 1 }}
            className={classnames(
              "d-flex",
              "justify-content-end"
            )}
          >
            <ProfileConnected />
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

NavbarConnected.propTypes = {
  bg: PropTypes.string,
  variant: PropTypes.string,
  brandImageKey: PropTypes.string,
  fixed: PropTypes.bool,
  links: PropTypes.arrayOf(
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
  links: [
    { call: 'Groups', action: '/groups' },
    { call: 'Serve', action: '/serve' },
    { call: 'Events', action: '/events' },
    { call: 'Give', action: '/give' },
    { call: 'Browse', action: '/articles' },
  ]
}

export default NavbarConnected
