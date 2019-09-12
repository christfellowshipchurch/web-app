import React, { useState } from 'react'
import { get } from 'lodash'
import { Block } from '@christfellowshipchurch/web-ui-kit'
import { Carousel } from 'react-bootstrap'
import ButtonRow from '../ButtonRow'


const FormattedCarousel = ({ children }) => {
  const [minHeight, setMinHeight] = useState(0)

  return (
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
                  <div
                    key={i}
                    className='pb-5 pt-4'
                    style={{ minHeight }}
                    ref={ref => {
                      const height = get(ref, 'clientHeight', 0)
                      if (height > minHeight)
                        setMinHeight(height)
                    }}>
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

                      <ButtonRow callToAction={callToAction} secondaryCallToAction={secondaryCallToAction} />

                    </Block>
                  </div>
                ) : null
            )}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default FormattedCarousel