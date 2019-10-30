import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { camelCase, get } from 'lodash'
import VisibilitySensor from 'react-visibility-sensor'

import { htmlToReactParser } from '../../utils'
import { Layout } from '..'

import ButtonRow from '../ButtonRow'

const titleClasses = classnames(
  'font-weight-bold',
)
const subtitleClasses = classnames(
  'mt-3',
  'subtitle',
  'text-secondary'
)
const htmlClasses = classnames(
  'pb-4',
)

const Block = ({
  contentLayout,
  images,
  videos,
  imageAlt,
  imageRatio,
  subtitle,
  title,
  htmlContent,
  callToAction,
  secondaryCallToAction,
  openLinksInNewTab,
  className,
  withAnimation
}) => {
  return (
    <VisibilitySensor active={withAnimation}>
      {({ isVisible }) => {
        return (
          <div
            className={classnames(
              'col',
              'py-6',
              {
                "opacity-0": !isVisible,
                "opacity-100": isVisible,
              },
              className,
            )}
          >
            <Layout
              layout={camelCase(contentLayout)}
              className={classnames(
                "max-width-1100",
              )}
              media={get(images, '[0].sources[0].uri', null) || get(videos, '[0].sources[0].uri', null)
                ? {
                  imageUrl: get(images, '[0].sources[0].uri', ''),
                  imageAlt,
                  videoUrl: get(videos, '[0].sources[0].uri', ''),
                  ratio: imageRatio,
                  showControls: true,
                  rounded: true,
                  className: classnames({
                    "animate-slide-left-right": isVisible && contentLayout === 'right',
                    "animate-slide-right-left": isVisible && contentLayout === 'left',
                  })
                } : null}
            >
              <div
                className="max-width-800 mx-auto"
                className={classnames(
                  "max-width-800",
                  "mx-auto",
                  {
                    "animate-slide-left-right": isVisible && contentLayout === 'left',
                    "animate-slide-right-left": isVisible && contentLayout === 'right',
                  }
                )}
              >
                <h5 className={subtitleClasses}>
                  {subtitle}
                </h5>

                <h1 className={titleClasses}>
                  {title}
                </h1>

                <div className={htmlClasses}>
                  {htmlToReactParser.parse(htmlContent)}
                </div>

                <ButtonRow
                  callToAction={callToAction}
                  secondaryCallToAction={secondaryCallToAction}
                  openLinksInNewTab={openLinksInNewTab}
                />
              </div>
            </Layout>
          </div>
        )
      }}
    </VisibilitySensor>
  )
}

Block.propTypes = {
  withAnimation: PropTypes.bool,
  contentLayout: PropTypes.oneOf([
    'default',
    'inverted',
    'left',
    'right'
  ])
}

Block.defaultProps = {
  withAnimation: false,
  contentLayout: 'default'
}

export default Block