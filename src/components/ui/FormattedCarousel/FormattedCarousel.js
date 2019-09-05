import React from 'react'
import { get } from 'lodash'
import { Carousel, Block, Button } from '@christfellowshipchurch/web-ui-kit'

const ButtonRow = ({ callToAction, secondaryCallToAction }) => (
  <div>
      {callToAction && callToAction.call !== '' && <Button type='primary' call={callToAction.call} />}
      <br></br>
      {secondaryCallToAction && secondaryCallToAction !== '' && <Button type='link' call={secondaryCallToAction.call} />}
  </div>
)

const FormattedCarousel = ({ children }) => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-10 col-md-4">
        <Carousel>
          {children.map(({
            __typename,
            images,
            imageAlt,
            videos,
            videoUrl,
            subtitle,
            title,
            htmlContent,
            callToAction,
            secondaryCallToAction
          }, i) => __typename === 'WebsiteBlockItem'
              ? (
                <Block
                  key={i}
                  layout={'default'}
                  media={{
                    imageUrl: get(images, '[0].sources[0].uri', ''),
                    imageAlt,
                    videoUrl: get(videos, '[0].sources[0].uri', ''),
                    ratio: '1by1',
                    circle: true
                  }} >
                  <Block.Title>{title}</Block.Title>
                  <Block.Subtitle>{subtitle}</Block.Subtitle>
                  <Block.Body>{htmlContent}</Block.Body>

                  <ButtonRow callToAction={callToAction} secondaryCallToAction={secondaryCallToAction} />
                </Block>
              ) : null
          )}
        </Carousel>
      </div>
    </div>
  </div>
)

export default FormattedCarousel