import React from 'react'
import classnames from 'classnames'
import { camelCase, get } from 'lodash'
import { htmlToReactParser } from '../../utils'
import { ButtonRow, Layout, Media } from '../../ui'

const BackgroundContentBlock = ({
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
  const lg = camelCase(contentLayout).includes('Large')
  const titleSize = lg ? 'display-3' : 'h1'
  const fontSize = lg ? 'bg-body-text' : ''

  return (
    <div className={classnames(
      'col',
      lg ? 'py-6' : '',
      className,
      lg ? 'min-vh-100' : '',
      'd-flex',
      'align-items-center'
    )}>
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

      <div
        className="p-absolute w-100 h-100"
        style={{
          top: 0,
          left: 0,
          overflow: 'hidden',
          background: 'rgba(0, 0, 0, 0.4)'
        }}>
      </div>

      <Layout
        contentLayout="default"
        className="text-white max-width-800 py-6">
        <div className={classnames(
          titleSize,
          'text-white',
          { 'mb-4': lg }
        )}>
          {title}
        </div>

        <div>
          {subtitle}
        </div>

        <p className={`pb-4 ${fontSize}`}>
          {htmlToReactParser.parse(htmlContent)}
        </p>

        <ButtonRow
          callToAction={callToAction}
          secondaryCallToAction={secondaryCallToAction}
          openLinksInNewTab={openLinksInNewTab}
        />
      </Layout>
    </div>
  )
}

BackgroundContentBlock.propTypes = {

}

BackgroundContentBlock.defaultProps = {

}

export default BackgroundContentBlock