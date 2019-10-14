import React from 'react'
import classnames from 'classnames'
import { camelCase, get } from 'lodash'
import { htmlToReactParser } from '../../utils'
import { Layout } from '..'

import ButtonRow from '../ButtonRow'

const titleClasses = classnames(
  'font-weight-bold',
)
const subtitleClasses = classnames(
  'pt-1',
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
  className
}) => {

  return (
    <div className={`col px-4 py-6 ${className}`}>
      <Layout
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
          <h5 className={subtitleClasses}>
            {subtitle}
          </h5>

          <h1 className={titleClasses}>
            {title}
          </h1>

          <p className={htmlClasses}>
            {htmlToReactParser.parse(htmlContent)}
          </p>
          <ButtonRow
            callToAction={callToAction}
            secondaryCallToAction={secondaryCallToAction}
            openLinksInNewTab={openLinksInNewTab}
          />
        </div>
      </Layout>
    </div>
  )
}

export default Block