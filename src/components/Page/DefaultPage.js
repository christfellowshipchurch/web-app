import React from 'react'
import PropTypes from 'prop-types'
import {
  useQuery
} from 'react-apollo'
import {
  lowerCase, get
} from 'lodash'
import {
  mapEdgesToNodes, redirectTo
} from '../../utils'
import getWebPageBlockItems from '../../queries/getWebPageBlockItems'
import getGroupContentItems from '../../queries/getGroupContentItems'

import SEO from '../../seo'
import PixelManager from '../PixelManager'
import ButtonRow from '../ui/ButtonRow'

import { Accordion, Carousel, Row, Loader, Block, Media, Button } from '@christfellowshipchurch/web-ui-kit'

const ContentBlock = ({
  contentLayout,
  images,
  imageAlt,
  videoUrl,
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
      videoUrl={videoUrl}
      ratio={imageRatio}
    >
      <Block contentLayout="default" className="text-light">
        <Block.Title className={`titleWeight`}>
          {title}
        </Block.Title>

        <Block.Subtitle className={`font-weight-bold`}>
          {subtitle}
        </Block.Subtitle>

        <Block.Body className={`pt-1 pb-4 font-weight-light`}>
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
          imageUrl={get(images, '[0].sources[0].uri', '')}
          imageAlt={imageAlt}
          videoUrl={videoUrl}
          ratio={imageRatio}
        >

          <Block.Subtitle className={`text-muted font-weight-bold`}>
            {subtitle}
          </Block.Subtitle>

          <Block.Title className={`titleWeight`}>
            {title}
          </Block.Title>

          <Block.Body className={`pt-1 pb-4 font-weight-light`}>
            {htmlContent}
          </Block.Body>

          <ButtonRow callToAction={callToAction} secondaryCallToAction={secondaryCallToAction} />
        </Block>
      </div>
    </div>
  ))



const DefaultPage = ({ title, match: { params: { page } } }) => {
  PixelManager.initWithPageView(`/${page || ''}`)

  const website = process.env.REACT_APP_WEBSITE_KEY
  const { loading, error, data } = useQuery(getWebPageBlockItems, { variables: { website, title: page || title } })

  if (loading) return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
      <Loader />
    </div>
  )

  if (error) {
    console.error("ERROR: ", error)
    return <h1 className="text-center">There was an error loading the page. Please try again.</h1>
  }

  // console.log({ data })

  const blockItems = mapEdgesToNodes(data.getWebsitePageContentByTitle.childContentItemsConnection)
  const {
    metaDescription,
    metaKeywords,
    openGraphProtocols,
    twitterProtocols,
  } = blockItems

  return (
    <>
      <SEO
        title={`${page || title} - Christ Fellowship Church`}
        description={metaDescription}
        keywords={metaKeywords}
        openGraphProtocols={openGraphProtocols}
        twitterProtocols={twitterProtocols}
      />

      {blockItems.map((item, i) => {
        const classenames = i % 2 === 0 ? 'bg-white' : 'bg-light'
        switch (item.__typename) {
          case 'WebsiteBlockItem':
            return (
              <div className={classenames} key={i}>
                <ContentBlock {...item} />
              </div>
            )
          case 'WebsiteGroupItem':
            return (
              <div className={classenames} key={i}>
                <GroupBlock {...item} />
              </div>
            )
          default:
            return <h1 className="text-center" key={i}>{item.title}</h1>
        }
      })}
    </>
  )
}

const GroupBlock = ({ id, groupLayout }) => {
  const { loading, error, data } = useQuery(getGroupContentItems, { variables: { id } })

  if (loading) return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
      <Loader />
    </div>
  )
  if (error) {
    console.error("ERROR: ", error)
    return <h1 className="text-center">There was an error loading block. Please try again.</h1>
  }

  const groupTitle = data.node.title
  const groupBody = data.node.htmlContent
  const blockItems = mapEdgesToNodes(data.node.childContentItemsConnection)

  if (!blockItems || !blockItems.length) return null

  switch (lowerCase(groupLayout)) {
    case 'row':
      console.log('Row items:', { blockItems })
      return (
        <Row>
          {blockItems.map((n, i) => n.__typename === 'WebsiteBlockItem'
            ? <ContentBlock {...n} key={i} /> : null)}
        </Row>
      )
    case 'accordion':
      return null
      return (
        <Accordion
          blockTitle={groupTitle}
          blockBody={groupBody}
        >
          {blockItems.map((accordionItem, j) => {
            return (
              <div key={j} title={accordionItem.title}>
                <h2>{accordionItem.title}</h2>
                {accordionItem.htmlContent}
              </div>
            )
          }
          )}
        </Accordion>
      )
    case 'carousel':
      // return null
      console.log('Carousel items:', { blockItems })
      return (
        <FormattedCarousel>
          {blockItems}
        </FormattedCarousel>
      )
    default:
      return null
  }
}

const FormattedCarousel = ({ children }) => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-10 col-md-4">
        <Carousel>
          {children.map(({
            __typename,
            images,
            imageAlt,
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
                    videoUrl,
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

DefaultPage.defaultProps = {
  title: 'home',
}

DefaultPage.propTypes = {
  title: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string
    })
  })
}

export default DefaultPage
