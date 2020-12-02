import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import { get } from 'lodash';

import { Media } from '../../ui';
import { htmlToReactParser } from '../../utils';

import SwoopImg from '../../images/cyan_hole_punch.svg';

const Swoop = () => {
  return (
    <img
      alt=""
      src={SwoopImg}
      style={{
        zIndex: 0,
        width: '100%',
      }}
      className={classnames('absolute-center', 'h-100', 'large-background-swoop')}
    />
  );
};

const HeroSection = ({
  title,
  htmlContent,
  callToAction,
  secondaryCallToAction,
  openLinksInNewTab,
  image,
  video,
  children,
  swoop,
}) => {
  return (
    <VisibilitySensor active partialVisibility minTopValue={0}>
      {({ isVisible }) => {
        return (
          <>
            <Media
              ratio="16by9"
              overlay="black"
              videoUrl={get(video, 'uri', null)}
              playVidInBackground
              imageUrl={get(image, 'uri', '')}
              imageAlt={get(image, 'alt', '')}
              fill="screen"
              className={classnames(
                'vw-100',
                'vh-100',
                'd-flex',
                'justify-content-center',
                'align-items-center'
              )}
            >
              {swoop && <Swoop />}

              <div
                className={classnames(
                  'vw-100',
                  'vh-100',
                  'd-flex',
                  'justify-content-center',
                  'align-items-center'
                )}
              >
                <div
                  className={classnames(
                    'w-100',
                    'max-width-1100',
                    'text-center',
                    'd-flex',
                    'justify-content-center'
                  )}
                  style={{ zIndex: 1000 }}
                >
                  <div
                    className={classnames('hero', 'max-width-800', 'p-3', 'pt-5', {
                      'opacity-0': !isVisible,
                      'opacity-100': isVisible,
                      'animate-slide-left-right': isVisible,
                    })}
                  >
                    <h1 className="text-white">{title}</h1>

                    <p className="my-2 pl-0 text-white font-weight-light">
                      {htmlToReactParser.parse(htmlContent)}
                    </p>

                    {children}

                    <div className="my-3">
                      {callToAction && (
                        <a
                          href={get(callToAction, 'action', '#')}
                          target={openLinksInNewTab ? '_blank' : ''}
                          className={classnames('btn', 'btn-primary', 'min-width-250')}
                        />
                      )}
                    </div>

                    <div className="my-3">
                      {secondaryCallToAction && (
                        <a
                          href={get(secondaryCallToAction, 'action', '#')}
                          target={openLinksInNewTab ? '_blank' : ''}
                          className={classnames('text-white')}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Media>

            {swoop && (
              <div
                className={classnames('width-100', 'bg-primary')}
                style={{
                  height: 70,
                }}
              />
            )}
          </>
        );
      }}
    </VisibilitySensor>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  htmlContent: PropTypes.string,
  callToAction: PropTypes.shape({
    call: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }),
  secondaryCallToAction: PropTypes.shape({
    call: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }),
  image: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  video: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
  children: PropTypes.object,
  swoop: PropTypes.bool,
};

HeroSection.defaultProps = {
  htmlContent: '',
  callToAction: null,
  secondaryCallToAction: null,
  image: null,
  video: null,
  children: null,
  swoop: true,
};

export default HeroSection;
