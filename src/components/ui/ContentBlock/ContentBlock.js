import React from 'react'
import classnames from 'classnames'
import { lowerCase, get } from 'lodash'
import { Block, Media } from '@christfellowshipchurch/web-ui-kit'

import ButtonRow from '../ButtonRow'

const titleClasses = classnames(
  'font-weight-bold'
)
const subtitleClasses = classnames(
  'pt-1'
)
const bodyClasses = classnames(
  'pt-1',
  'pb-4',
  'px-3'
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
  secondaryCallToAction
}) => (lowerCase(contentLayout) === 'background'
  ? (
    <Media
      imageUrl={get(images, '[0].sources[0].uri', '')}
      imageAlt={imageAlt}
      videoUrl={get(videos, '[0].sources[0].uri', '')}
      ratio={imageRatio}
    >
      <Block contentLayout="default" className="text-light">
        <Block.Title className='display-4'>
          {title}
        </Block.Title>

        <Block.Subtitle className=''>
          {subtitle}
        </Block.Subtitle>

        <Block.Body className={bodyClasses}>
          {htmlContent}
        </Block.Body>

        <ButtonRow callToAction={callToAction} secondaryCallToAction={secondaryCallToAction} />
      </Block>
    </Media>
  )
  : (
    <div className="container py-5">
      <div className="row">
        <Block
          layout={lowerCase(contentLayout)}
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

          <Block.Subtitle className={subtitleClasses}>
            {subtitle}
          </Block.Subtitle>

          <Block.Title className={titleClasses}>
            {title}
          </Block.Title>

          <Block.Body className={bodyClasses}>
            {htmlContent}
          </Block.Body>

          <ButtonRow callToAction={callToAction} secondaryCallToAction={secondaryCallToAction} />
        </Block>
      </div>
    </div>
  )
  )

export default ContentBlock