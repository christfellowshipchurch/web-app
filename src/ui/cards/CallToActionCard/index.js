import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Card, Media, Icon } from 'ui';

import { generateUrlLink } from '..';

const CardLink = ({ children, className, to: { id, href: pathname, target } = {} }) =>
  // if we have a target it's an external link so render an anchor `a`
  target ? (
    <a className={className} href={pathname} target={target}>
      {children}
    </a>
  ) : (
    // else render with react-routers internal Link.
    <Link to={{ pathname, state: { contentId: id } }} className={className}>
      {children}
    </Link>
  );

const CallToActionCard = ({
  coverImage,
  icon,
  id,
  onClick,
  redirectUrl,
  title,
  urlBase,
}) => {
  const style = onClick ? { cursor: 'pointer' } : {};
  const href = generateUrlLink({
    urlBase,
    title,
    id,
    redirectUrl,
  });

  return (
    <CardLink
      className={classnames(
        'col-md-6',
        'col-lg-4',
        'px-2',
        'pt-2',
        'scale-media-up-on-hover',
        'no-decoration',
        'my-3'
      )}
      to={href}
    >
      <Card fill className={classnames('h-100, overflow-hidden')} style={style}>
        <Media
          imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
          imageUrl={get(coverImage, '[0].uri', '')}
          ratio="16by9"
          className={classnames('rounded-top', 'bg-light')}
          forceRatio
          gradient="dark"
          gradientDirection="bottom-top"
        >
          {!!title && (
            <h6
              style={{
                position: 'absolute',
                bottom: 4,
                left: 16,
                color: '#ffffff',
                fontSize: 24,
              }}
            >
              {title}
            </h6>
          )}
          {!!icon && (
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
              }}
            >
              <Icon name={icon} size={42} fill="#ffffff" />
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              opacity: 0.65,
            }}
          >
            <Icon name="arrow-up-right" fill="#ffffff" />
          </div>
        </Media>
      </Card>
    </CardLink>
  );
};

CallToActionCard.propTypes = {
  coverImage: PropTypes.object,
  icon: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  redirectUrl: PropTypes.string,
  title: PropTypes.string,
  urlBase: PropTypes.string,
};

CallToActionCard.defaultProps = {
  coverImage: null,
  icon: null,
  id: '',
  onClick: null,
  redirectUrl: '',
  title: null,
  urlBase: 'content',
};

export default CallToActionCard;
