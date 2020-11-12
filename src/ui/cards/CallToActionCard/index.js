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

const ContentCard = ({
  coverImage,
  icon,
  id,
  label,
  onClick,
  redirectUrl,
  row,
  summary,
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
      <Card
        fill
        className={classnames({ 'h-100': !row }, 'overflow-hidden')}
        style={style}
      >
        <div
          className={classnames({
            'flex-column': !!row,
            'flex-md-row': !!row,
            'd-flex': row,
            'align-items-md-center': row,
          })}
        >
          <Media
            imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
            imageUrl={get(coverImage, '[0].uri', '')}
            ratio="16by9"
            className={classnames('rounded-top', 'bg-light')}
            style={{ ...(row && { flex: 1 }) }}
            forceRatio
          >
            {!!label.value && (
              <h6
                style={{
                  position: 'absolute',
                  bottom: -10,
                  left: 0,
                  letterSpacing: 4,
                }}
                className={classnames(
                  'px-3',
                  'py-2',
                  [`bg-${label.bg}`],
                  [`text-${label.textColor}`],
                  'text-uppercase'
                )}
              >
                <small className="font-weight-bold">{label.value}</small>
              </h6>
            )}
          </Media>
          <div className="mt-3 mx-3 row" style={row ? { flex: 2 } : {}}>
            <div className="col pr-1">
              <h4 className="mb-2">{title}</h4>
              <p className="text-secondary" style={{ fontSize: '.8rem' }}>
                {summary}
              </p>
            </div>
            {!!icon && icon !== '' && (
              <div className="col-1 text-right text-secondary">
                <Icon name={icon} />
              </div>
            )}
          </div>
        </div>
      </Card>
    </CardLink>
  );
};

ContentCard.propTypes = {
  coverImage: PropTypes.object,
  icon: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.shape({
    value: PropTypes.string,
    bg: PropTypes.string,
    textColor: PropTypes.string,
  }),
  onClick: PropTypes.func,
  redirectUrl: PropTypes.string,
  row: PropTypes.bool,
  summary: PropTypes.string,
  title: PropTypes.string,
  urlBase: PropTypes.string,
};

ContentCard.defaultProps = {
  coverImage: null,
  icon: null,
  id: '',
  label: {
    value: '',
    bg: 'dark',
    textColor: 'white',
  },
  onClick: null,
  summary: '',
  redirectUrl: '',
  row: false,
  title: null,
  urlBase: 'content',
};

export default ContentCard;
