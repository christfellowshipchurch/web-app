import React from 'react';
import PropTypes from 'prop-types';
import { lowerCase, includes } from 'lodash';
import Media from '../Media';

//This component handels the Default, Inverted, Left, Right Block layouts

const MEDIA_COL_12 = ['default', 'inverted'];
const MEDIA_COL_FIRST = ['default', 'right'];
const TEXT_CENTER = ['default', 'inverted'];

const Layout = ({
  layout,
  imageUrl,
  imageAlt,
  videoUrl,
  ratio,
  children,
  className,
  rounded,
  grouped,
  media,
}) => {
  layout = lowerCase(layout);
  const mediaColSize = includes(MEDIA_COL_12, layout) ? 'col-md-12' : 'col-md-6';
  const mediaColOrder =
    layout === 'inverted'
      ? 'order-last'
      : includes(MEDIA_COL_FIRST, layout)
      ? 'order-first'
      : 'order-first order-md-last';

  const textAlignment = includes(TEXT_CENTER, layout) ? 'text-center' : 'text-left';

  const mediaItem = media ? (
    <div
      className={`${
        grouped ? 'mx-xl-3 mx-lg-3 mx-md-3 px-lg-4 px-md-3 px-sm-6 mx-sm-6 px-4 mx-4' : ''
      }`}
    >
      <Media {...media} />
    </div>
  ) : imageUrl || videoUrl ? (
    <div className={`${grouped ? 'mx-3 px-lg-4 px-md-3 px-sm-6 mx-sm-6' : ''}`}>
      <Media
        ratio={ratio}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        videoUrl={videoUrl}
        rounded
      />
    </div>
  ) : null;

  return (
    <div className={`container-fluid ${className}`}>
      <div className="row align-items-center">
        <div
          className={`col-12 ${mediaColSize} ${mediaColOrder} ${
            grouped ? 'px-4' : 'px-3'
          } my-2`}
        >
          {mediaItem}
        </div>
        <div className={`col-12 col-md ${textAlignment} px-4 my-2`}>{children}</div>
      </div>
    </div>
  );
};

const defaultProps = {
  layout: 'default',
  className: '',
};

const propTypes = {
  layout: PropTypes.string,
  className: PropTypes.string,
};

Layout.defaultProps = defaultProps;
Layout.propTypes = propTypes;

export default Layout;
