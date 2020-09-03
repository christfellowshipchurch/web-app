import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get, camelCase } from 'lodash';
import { Navbar } from 'react-bootstrap';

import { GET_WEBSITE_HEADER } from './queries';
import DynamicBanner from './DynamicBanner';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import NavbarToggle from './NavbarToggle';

// Takes a collection of images from the API's return data and formats
//  it to be an array of the following object structure: { imageKey: { uri, alt } }
const imageArrayToObject = (images) => {
  const imagesObj = {};

  images.forEach((n, i) => {
    const key = camelCase(get(n, 'name', i));
    const uri = get(n, 'sources[0].uri', '');
    const alt = get(n, 'name', 'Christ Fellowship Church');

    imagesObj[key] = { uri, alt };
  });

  return imagesObj;
};

const BrandImg = ({ className, uri, alt }) => (
  <Navbar.Brand href="/" className={classnames('align-self-start', className)}>
    <img src={uri} style={{ height: '58px', width: 'auto' }} alt={alt} />
  </Navbar.Brand>
);

const NavbarConnected = ({ bg, variant, brandImageKey, fixed, onToggle }) => {
  const [menuIcon, setMenuIcon] = useState(false);
  const website = process.env.REACT_APP_WEBSITE_KEY;
  const { loading, error, data } = useQuery(GET_WEBSITE_HEADER, {
    variables: { website },
    fetchPolicy: 'cache-and-network',
  });

  const navLinks = get(data, 'getWebsiteNavigation.navigationLinks', []);
  const quickAction = get(data, 'getWebsiteNavigation.quickAction', null);
  const menuLinks = get(data, 'getWebsiteNavigation.menuLinks', []);

  const images = imageArrayToObject(get(data, 'getWebsiteNavigation.images', []));
  const brandImage = get(images, brandImageKey, null);
  const navbarProps = {
    bg,
    variant,
    expand: 'lg',
  };

  const isDark = variant == 'dark';

  // We use sticky styling as the default so that padding is respected
  //    with the option to override it to use a fixed styling if preferred
  if (fixed) navbarProps.fixed = 'top';
  else navbarProps.sticky = 'top';

  return (
    <Navbar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...navbarProps}
      id="user-profile-navbar-connected"
      className={classnames('d-flex', 'flex-column', 'p-0')}
    >
      <div className="row w-100">
        <DynamicBanner />
      </div>

      <div className={classnames('row', 'w-100', 'd-flex', 'justify-content-between')}>
        {/* { Right aligned Brand Image } */}
        {brandImage && (
          <BrandImg uri={brandImage.uri} alt={brandImage.alt} className="p-2 pl-3" />
        )}

        {/* { Toggle for Mobile } */}
        <NavbarToggle isDark={isDark} onClick={onToggle} />

        <Navbar.Collapse>
          <div
            className={classnames(
              'd-flex',
              'flex-column',

              'flex-lg-row',
              'justify-content-lg-end',

              'w-100',
              'px-lg-3'
            )}
          >
            {/* { Desktop Navigation } */}
            <DesktopNav
              navLinks={navLinks}
              menuLinks={menuLinks}
              quickAction={quickAction}
              isDark={isDark}
            />

            {/* { Mobile Navigation } */}
            <MobileNav
              navLinks={[...navLinks, ...menuLinks]}
              quickAction={quickAction}
              isDark={isDark}
            />
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

NavbarConnected.propTypes = {
  bg: PropTypes.string,
  variant: PropTypes.string,
  brandImageKey: PropTypes.string,
  fixed: PropTypes.bool,
  isDark: PropTypes.bool,
};

NavbarConnected.defaultProps = {
  bg: 'white',
  variant: 'light',
  brandImageKey: 'brandImage',
  fixed: false,
  isDark: false,
};

export default NavbarConnected;
