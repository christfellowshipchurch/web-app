import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media } from '../..';

import { generateUrlLink } from '..';

import { CardLink } from '../ContentCard';

const RowCard = ({ id, title, coverImage, summary, urlBase, label, redirectUrl }) => {
  const href = generateUrlLink({
    urlBase,
    title,
    id,
    redirectUrl,
  });

  return (
    <CardLink
      className={classnames('w-100', 'p-2', 'scale-media-up-on-hover', 'no-decoration')}
      to={href}
    >
      <div
        className={classnames(
          'p-0',
          'd-flex',
          'flex-row',
          'align-items-center',
          'bg-white',
          'rounded',
          'shadow'
        )}
      >
        <div style={{ flex: 1 }}>
          <Media
            imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
            imageUrl={get(coverImage, '[0].uri', '')}
            ratio="1by1"
            className={classnames('bg-light', 'rounded')}
          />
        </div>
        <div style={{ flex: 3 }} className={classnames('px-2')}>
          {label.value !== '' && <h6 className="text-secondary mb-0">{label.value}</h6>}
          <h4 className="mb-0 mt-1 text-lines-1">{title}</h4>
          <p className="text-secondary mb-0 text-lines-2" style={{ fontSize: '.8rem' }}>
            {summary}
          </p>
        </div>
      </div>
    </CardLink>
  );
};

RowCard.propTypes = {
  coverImage: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  id: PropTypes.string,
  label: PropTypes.shape({
    bg: PropTypes.string,
    textColor: PropTypes.string,
    value: PropTypes.string,
  }),
  redirectUrl: PropTypes.string,
  summary: PropTypes.string,
  title: PropTypes.string,
  urlBase: PropTypes.string,
};

RowCard.defaultProps = {
  coverImage: null,
  id: null,
  label: {
    bg: 'dark',
    textColor: 'white',
    value: 'tags[0]',
  },
  redirectUrl: '',
  summary: '',
  title: null,
  urlBase: 'content',
};

export default RowCard;
