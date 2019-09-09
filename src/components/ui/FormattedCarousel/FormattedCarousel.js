import React from 'react'
import { get } from 'lodash'
import { Carousel, Block, Button } from '@christfellowshipchurch/web-ui-kit'
import '../../../styles.css'

const ButtonRow = ({ callToAction, secondaryCallToAction }) => (
  <div>
      {callToAction && callToAction.call !== '' && <Button type='primary' call={callToAction.call} />}
      <br></br>
      {secondaryCallToAction && secondaryCallToAction !== '' && <Button type='link' call={secondaryCallToAction.call} />}
  </div>
)

const FormattedCarousel = ({ children }) => (
  <div className="container pt-4">
    <div className="row py-5">
      <div className="col">
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
                <>
                <h2 className='text-center text-dark pb-1'>{title}</h2>
                <Block
                  key={i}
                  layout={'default'}
                  media={{
                    imageUrl: get(images, '[0].sources[0].uri', ''),
                    imageAlt,
                    videoUrl: get(videos, '[0].sources[0].uri', ''),
                    ratio: '1by1',
                    circle: true,
                    className: 'carousel-img m-0 m-auto'
                  }} >
                  <div className='d-flex justify-content-center'>
                    <Block.Subtitle>{subtitle}</Block.Subtitle>
                    <Block.Body className='col-10 pt-3 font-weight-light'>{htmlContent}</Block.Body>
                  </div>
                  
                  {/* <ButtonRow callToAction={callToAction} secondaryCallToAction={secondaryCallToAction} /> */}

                </Block>
                </>
              ) : null
          )}
        </Carousel>
      </div>
    </div>
  </div>
)

export default FormattedCarousel