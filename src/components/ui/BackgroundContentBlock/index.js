import React from 'react'
import { camelCase, get } from 'lodash'
import { Block, Media } from '@christfellowshipchurch/web-ui-kit'

import ButtonRow from '../ButtonRow'

export default ({
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
}) => {
  const lg = camelCase(contentLayout).includes('Large')
  const titleSize = lg ? 'display-3' : 'h2'
  const fontSize = lg ? 'bg-body-text' : ''

  return (
    <div className="col py-5">
      <div
        className="p-absolute w-100 h-100"
        style={{ top: 0, left: 0, overflow: 'hidden' }}>
        <Media
          imageUrl={get(images, '[0].sources[0].uri', '')}
          imageAlt={imageAlt}
          videoUrl={get(videos, '[0].sources[0].uri', '')}
          ratio={imageRatio}
          className="h-100 w-100"
        />
      </div>

      <Block
        contentLayout="default"
        className="text-white max-width-800 py-5">
        <Block.Title className={`${titleSize}`}>
          {title}
        </Block.Title>

        <Block.Subtitle>
          {subtitle}
        </Block.Subtitle>

        <Block.Body className={`pb-4 ${fontSize}`}>
          {htmlContent}
        </Block.Body>

        <ButtonRow
          callToAction={callToAction}
          secondaryCallToAction={secondaryCallToAction} />
      </Block>
    </div>
  )
}