import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Media, Loader } from '../..';
import { Icon } from '../../Icons';

import { generateUrlLink } from '..';

const HighlightCard = ({
  coverImage,
  id,
  isLive,
  isLoading,
  mediaProps,
  ratio,
  redirectUrl,
  style,
  summary,
  tile,
  title,
  urlBase,
}) => (
  <a
    className={classnames('scale-media-up-on-hover', 'no-decoration')}
    {...generateUrlLink({
      urlBase,
      title,
      id,
      redirectUrl,
    })}
  >
    <Media
      ratio={ratio}
      imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
      imageUrl={get(coverImage, '[0].uri', '')}
      rounded
      withHover
      forceRatio
      style={style}
      className="shadow"
      {...mediaProps}
    >
      <div
        className={classnames(
          'w-100',
          'h-100',
          'p-3',
          'p-lg-4',
          'd-flex',
          'flex-row',
          'align-items-end'
        )}
        style={{ zIndex: 2 }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {isLive && (
              <span
                className="badge badge-danger text-white"
                style={{ marginLeft: '-0.4em' }}
              >
                <Icon name="live-dot" fill="white" size="6" className="mr-1" />
                LIVE NOW
              </span>
            )}
            <span className="d-block pt-1" />
            <span
              className={classnames('text-white', {
                h5: tile,
                'h4-md': tile,
                'h3-lg': tile,
                h3: !tile,
              })}
            >
              {title}
            </span>
            <p className="text-white m-0">{summary}</p>
          </div>
        )}
      </div>
    </Media>
  </a>
);

HighlightCard.propTypes = {
  coverImage: PropTypes.array,
  id: PropTypes.string,
  isLive: PropTypes.bool,
  isLoading: PropTypes.bool,
  mediaProps: PropTypes.object,
  ratio: PropTypes.any,
  redirectUrl: PropTypes.string,
  style: PropTypes.object,
  summary: PropTypes.string,
  tile: PropTypes.bool,
  title: PropTypes.string,
  urlBase: PropTypes.string,
};

HighlightCard.defaultProps = {
  coverImage: null,
  id: null,
  isLive: false,
  isLoading: false,
  mediaProps: {
    overlay: 'black',
  },
  ratio: '1by1',
  redirectUrl: null,
  style: null,
  summary: '',
  tile: false,
  title: null,
  urlBase: 'content',
};

export default HighlightCard;
