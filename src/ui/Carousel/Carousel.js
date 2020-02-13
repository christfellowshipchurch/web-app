import React, { useState } from 'react'
import classnames from 'classnames'
import { get } from 'lodash'
import { Carousel } from 'react-bootstrap'
import ButtonRow from '../ButtonRow'
import Media from '../Media'
import { htmlToReactParser } from '../../utils'



const FormattedCarousel = ({ children }) => {
  const [minHeight, setMinHeight] = useState(0)

  return (
    <div className="container">
      <div className="row py-6">
        <div className="col">
          <Carousel>
            {children.map(({
              __typename,
              images,
              videos,
              subtitle,
              title,
              htmlContent,
              callToAction,
              secondaryCallToAction
            }, i) => __typename === 'WebsiteBlockItem'
                ? (
                  <Carousel.Item>
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
                    <Media
                      imageUrl={get(images, '[0].sources[0].uri', '')}
                      imageAlt={get(images, '[0].sources[0].name', '')}
                      videoUrl={get(videos, '[0].sources[0].uri', '')}
                      ratio='1by1'
                      circle
                      className='carousel-img m-0 m-auto'
                    />

                    <div className='d-flex justify-content-center'>
                      <h2 className={subtitle}></h2>
                      <div
                        className={classnames(
                          'col-10',
                          'pt-4',
                          'text-center',
                          'max-width-600'
                        )}
                      >
                        {htmlToReactParser.parse(htmlContent)}
                      </div>
                    </div>

                    <ButtonRow callToAction={callToAction} secondaryCallToAction={secondaryCallToAction} />

                  </div>
                  </Carousel.Item>
                ) : null
            )}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default FormattedCarousel