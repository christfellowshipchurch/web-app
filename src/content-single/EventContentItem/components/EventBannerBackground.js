import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

import { Media } from 'ui';

const EventBannerBackground = ({ title, coverImage, isLive }) => {
  const coreMediaProps = {
    imageUrl: get(coverImage, 'sources[0].uri', ''),
    imageAlt: `${title} - ${get(coverImage, 'name', '')}`,
    ratio: { xs: '16by9' },
    forceRatio: true,
  };

  return (
    <section className="p-absolute w-100">
      <div className="p-absolute w-100 h-100 overflow-hidden" style={{ bottom: 50 }}>
        <Media
          {...coreMediaProps}
          className="absolute-center"
          style={{ filter: 'blur(50px)', height: '150%', width: '150%' }}
        />
        <div className="fill bg-black opacity-30" />
      </div>

      {/*
      TODO:
      This is a "fake" or invisible component that needs to match the output dimensions of the
      EventMedia component... create a placeholder export version so this isn't repeated
      un-intuitively in two places.
    */}
      <div className="container-fluid">
        <div className="row">
          <div className={isLive ? 'col-lg-8' : 'col-12'}>
            <div
              className={classnames('max-width-1100 mx-auto invisible', {
                'pt-6 px-3': !isLive,
                'pt-3 pt-md-4': isLive,
              })}
            >
              <Media {...coreMediaProps} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

EventBannerBackground.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape({
    name: PropTypes.string,
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
  isLive: PropTypes.bool,
};

EventBannerBackground.defaultProps = {
  title: '',
  coverImage: {},
  isLive: false,
};

export default EventBannerBackground;
