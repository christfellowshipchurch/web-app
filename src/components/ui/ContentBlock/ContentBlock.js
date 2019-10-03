import React from 'react'
import classnames from 'classnames'
import { camelCase, get } from 'lodash'
import { Block } from '@christfellowshipchurch/web-ui-kit'

import ButtonRow from '../ButtonRow'

const titleClasses = classnames(
  'font-weight-bold'
)
const subtitleClasses = classnames(
  'pt-1'
)

const ContentBlock = ({
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
  className
}) => (
    <div className={`col px-4 py-6 ${className}`}>
      <Block
        layout={camelCase(contentLayout)}
        className="max-width-1100"
        media={get(images, '[0].sources[0].uri', null) || get(videos, '[0].sources[0].uri', null)
          ? {
            imageUrl: get(images, '[0].sources[0].uri', ''),
            imageAlt,
            videoUrl: get(videos, '[0].sources[0].uri', ''),
            ratio: imageRatio,
            showControls: true,
            rounded: true
          } : null}
      >
        <div className="max-width-800">
          <Block.Subtitle className={subtitleClasses}>
            {subtitle}
          </Block.Subtitle>

          <Block.Title className={titleClasses}>
            {title}
          </Block.Title>

          <Block.Body className="pb-4">
            {htmlContent}
          </Block.Body>
          <ButtonRow 
            callToAction={callToAction} 
            secondaryCallToAction={secondaryCallToAction} 
            openLinksInNewTab={openLinksInNewTab}   
          />
        </div>
      </Block>
    </div>
  )

export default ContentBlock