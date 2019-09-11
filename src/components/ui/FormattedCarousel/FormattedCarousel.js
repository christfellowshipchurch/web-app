import React from 'react'
import { get } from 'lodash'
import { Block } from '@christfellowshipchurch/web-ui-kit'
import { Carousel } from 'react-bootstrap'
import '../../../styles.css'


const FormattedCarousel = ({ children }) => (
  <div className="container">
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
                <div className='pb-5 pt-4' key={i} >
                <h2 className='text-center text-dark pb-1'>{title}</h2>
                <Block
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
                </div>
              ) : null
          )}
        </Carousel>
      </div>
    </div>
  </div>
)

export default FormattedCarousel