import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { isMobile } from 'react-device-detect';

import { Media } from '../..';

import { trimText } from '../../../utils';

import { generateUrlLink } from '..';

const TileRowCard = ({
  coverImage,
  id,
  isLoading,
  label,
  redirectUrl,
  summary,
  title,
  urlBase,
}) => (
  <a
    className={classnames(
      'w-100',
      'p-2',
      'scale-media-up-on-hover',
      'no-decoration',
      'd-flex',
      'flex-row',
      'align-items-center'
    )}
    {...generateUrlLink({
      urlBase,
      title,
      id,
      redirectUrl,
    })}
  >
    <div style={{ flex: 1 }}>
      <Media
        imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
        imageUrl={get(coverImage, '[0].uri', '')}
        ratio="1by1"
        className={classnames('rounded', 'bg-light')}
        mediaItemStyles={{
          boxShadow: '0 10px 9px -4px rgba(0, 0, 0, 0.25)',
        }}
      />
    </div>
    <div style={{ flex: 3 }} className={classnames('px-2')}>
      {label.value !== '' && <h6 className="text-secondary">{label.value}</h6>}
      <h4 className={classnames('mb-0', { 'loading-bar w-75': isLoading && !title })}>
        {title}
      </h4>
      <p
        className={classnames('text-secondary', 'mb-0', {
          'loading-bar w-25': isLoading && !summary,
        })}
        style={{ fontSize: '.8rem' }}
      >
        {trimText({ text: summary, isMobile: isMobile })}
      </p>
    </div>
  </a>
);

TileRowCard.propTypes = {
  coverImage: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  label: PropTypes.shape({
    value: PropTypes.string,
    bg: PropTypes.string,
    textColor: PropTypes.string,
  }),
  redirectUrl: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string,
  urlBase: PropTypes.string,
};

TileRowCard.defaultProps = {
  coverImage: null,
  id: null,
  summary: '',
  title: null,
  urlBase: 'content',
  label: {
    value: 'tags[0]',
    bg: 'dark',
    textColor: 'white',
  },
};

export default TileRowCard;
