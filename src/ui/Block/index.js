import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { camelCase, get } from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';

import { htmlToReactParser } from '../../utils';
import { Layout } from '..';

const Block = ({
  callToAction,
  className,
  contentLayout,
  grouped,
  hideTitle,
  htmlContent,
  imageAlt,
  imageRatio,
  images,
  openLinksInNewTab,
  secondaryCallToAction,
  subtitle,
  textAlignment,
  title,
  variant,
  videos,
  withAnimation,
}) => {
  const textColorClass = classnames({
    'text-white': variant === 'dark',
    'text-dark': variant === 'light',
  });

  // If Block is being grouped with 3 or more Blocks, it will remove title and padding
  const groupPadding = grouped ? 'py-0' : 'py-6';

  return (
    <VisibilitySensor active={withAnimation} partialVisibility minTopValue={250}>
      {({ isVisible }) => {
        return (
          <Layout
            layout={camelCase(contentLayout)}
            grouped={grouped}
            className={classnames(
              'max-width-1100',
              groupPadding,
              {
                'opacity-0': !isVisible,
                'opacity-100': isVisible || !withAnimation,
              },
              className
            )}
            media={
              get(images, '[0].sources[0].uri', null) ||
              get(videos, '[0].sources[0].uri', null)
                ? {
                    imageUrl: get(images, '[0].sources[0].uri', ''),
                    imageAlt,
                    videoUrl: get(videos, '[0].sources[0].uri', ''),
                    ratio: imageRatio,
                    showControls: true,
                    rounded: true,
                    circle: grouped,
                    className: classnames({
                      'max-width-800':
                        contentLayout === 'default' || contentLayout === 'inverted',
                      'mx-auto':
                        contentLayout === 'default' || contentLayout === 'inverted',
                      'animate-slide-left-right': isVisible && contentLayout === 'right',
                      'animate-slide-right-left': isVisible && contentLayout === 'left',
                      'animate-slide-bottom-top':
                        isVisible &&
                        (contentLayout === 'default' || contentLayout === 'inverted'),
                    }),
                  }
                : null
            }
          >
            <div
              className={classnames('max-width-800', 'mx-auto', `text-${textAlignment}`, {
                'animate-slide-left-right': isVisible && contentLayout === 'left',
                'animate-slide-right-left': isVisible && contentLayout === 'right',
                'animate-slide-bottom-top':
                  isVisible &&
                  (contentLayout === 'default' || contentLayout === 'inverted'),
              })}
            >
              <h5
                className={classnames(
                  'mt-3',
                  'subtitle',
                  'text-secondary',
                  textColorClass
                )}
              >
                {subtitle}
              </h5>

              <h1 className={classnames('font-weight-bold', textColorClass)}>
                {!hideTitle && title}
              </h1>

              <div className={classnames('pb-3', textColorClass)}>
                {htmlToReactParser.parse(htmlContent)}
              </div>

              <div className={`${grouped ? 'pt-3' : ''}`}>
                {callToAction && callToAction.call !== '' && callToAction.action !== '' && (
                  <a
                    className={classnames('btn', {
                      'btn-primary': variant === 'light',
                      'btn-white': variant === 'dark',
                    })}
                    href={callToAction.action}
                    target={openLinksInNewTab ? '_blank' : ''}
                  >
                    {callToAction.call}
                  </a>
                )}
              </div>

              <div className="">
                {secondaryCallToAction &&
                  secondaryCallToAction.call !== '' &&
                  secondaryCallToAction.action !== '' && (
                    <a
                      className={classnames('btn', 'btn-link', {
                        'text-primary': variant === 'light',
                        'text-white': variant === 'dark',
                      })}
                      href={secondaryCallToAction.action}
                      target={openLinksInNewTab ? '_blank' : ''}
                    >
                      {secondaryCallToAction.call}
                    </a>
                  )}
              </div>
            </div>
          </Layout>
        );
      }}
    </VisibilitySensor>
  );
};

Block.propTypes = {
  callToAction: PropTypes.object,
  className: PropTypes.string,
  contentLayout: PropTypes.oneOf(['default', 'inverted', 'left', 'right']),
  grouped: PropTypes.bool,
  hideTitle: PropTypes.bool,
  htmlContent: PropTypes.string,
  imageAlt: PropTypes.string,
  imageRatio: PropTypes.string,
  images: PropTypes.array,
  openLinksInNewTab: PropTypes.bool,
  secondaryCallToAction: PropTypes.object,
  subtitle: PropTypes.string,
  textAlignment: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  videos: PropTypes.string,
  withAnimation: PropTypes.bool,
};

Block.defaultProps = {
  withAnimation: false,
  contentLayout: 'default',
  textColor: 'dark',
  variant: 'light',
};

export default Block;
