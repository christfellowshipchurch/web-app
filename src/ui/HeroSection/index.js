import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import VisibilitySensor from 'react-visibility-sensor'
import { get } from 'lodash'

import {
  Block,
  Button,
  Media
} from '../../ui'
import {
  htmlToReactParser,
  redirectTo
} from '../../utils'

import SwoopImg from '../../images/cyan_hole_punch.svg'

const Swoop = () => {
  return (
    <img
      src={SwoopImg}
      style={{
        zIndex: 0,
        width: '105%'
      }}
      className={classnames(
        'absolute-center',
        'h-100',
        'large-background-swoop'
      )}
    />
  )
}

const HeroSection = ({
  title,
  htmlContent,
  callToAction,
  secondaryCallToAction,
  image,
  video
}) => {
  return (
    <VisibilitySensor
      active
      partialVisibility
      minTopValue={0}
    >
      {({ isVisible }) => {
        return (
          <Media
            ratio="16by9"
            overlay='black'
            videoUrl={get(video, 'uri', null)}
            imageUrl={get(image, 'uri', '')}
            imageAlt={get(image, 'alt', '')}
            fill="screen"
            className={classnames(
              'vw-100',
              'vh-100',
              "d-flex",
              "justify-content-center",
              "align-items-center",
            )}
          >
            <Swoop />

            <div
              className="w-100 max-width-1100"
              style={{ zIndex: 1000 }}
            >
              <div
                className={classnames(
                  'hero',
                  "max-width-600",
                  'p-3',
                  'pt-5',
                  {
                    'opacity-0': !isVisible,
                    'opacity-100': isVisible,
                    'animate-slide-left-right': isVisible,
                  }
                )}
              >
                <h1 className="text-white">
                  {title}
                </h1>

                <p className="my-4 text-white">
                  {htmlToReactParser.parse(htmlContent)}
                </p>

                {callToAction &&
                  <div>
                    <Button
                      className="my-2 min-width-250"
                      type="white"
                      title={get(callToAction, 'call', '')}
                      onClick={() => redirectTo(get(callToAction, 'action', ''))}
                    />
                  </div>}

                {secondaryCallToAction &&
                  <div>
                    <Button
                      className="my-2 pl-0 text-white min-width-250"
                      type="link"
                      title={get(secondaryCallToAction, 'call', '')}
                      onClick={() => redirectTo(get(secondaryCallToAction, 'action', ''))}
                    />
                  </div>}
              </div>
            </div>
          </Media>
        )
      }}
    </VisibilitySensor>
  )
}

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
  })
}

HeroSection.defaultProps = {
  htmlContent: '',
  callToAction: null,
  secondaryCallToAction: null,
  image: null,
  video: null,
}

export default HeroSection