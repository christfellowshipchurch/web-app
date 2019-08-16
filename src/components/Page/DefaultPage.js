import React from 'react'
import PropTypes from 'prop-types'
import {
 useQuery
} from 'react-apollo'
import {
  lowerCase
} from 'lodash'
import {
  mapEdgesToNodes,
} from '../../utils'
import getWebPageBlockItems from '../../queries/getWebPageBlockItems'
import getGroupContentItems from '../../queries/getGroupContentItems'
import getWebPageContentIds from '../../queries/getWebPageContentIds'

import SEO from '../../seo'
import PixelManager from '../PixelManager'

import { Accordion, Carousel, Row, Loader,  } from '@christfellowshipchurch/web-ui-kit'
import { renderBlock } from '@christfellowshipchurch/web-ui-kit/lib/utils'

const DefaultPage = ({ title, match: { params: { page } } }) => {
  PixelManager.initWithPageView(`/${page || ''}`)

  const website = process.env.REACT_APP_WEBSITE_KEY
  const { loading, error, data } = useQuery(getWebPageBlockItems, { variables: { website, title: page || title }})

  if (loading) return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <Loader />
    </div>
  )

  if (error) {
    console.error("ERROR: ", error)
    return <h1 className="text-center">There was an error loading the page. Please try again.</h1>
  }


  const blockItems = mapEdgesToNodes(data.getWebsitePageContentByTitle.childContentItemsConnection)
  const {
    metaDescription,
    metaKeywords,
    openGraphProtocols,
    twitterProtocols,
  } = blockItems
  // console.log({blockItems})


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
        switch (item.__typename) {
          case 'WebsiteBlockItem':
            console.log({item})
            return (
              <div key={i}>
                {renderBlock({content: item})}
              </div>
            )
          case 'WebsiteGroupItem':
            return (
              <div key={i}>
                <GroupBlock id={item.id} layout={item.groupLayout}  />
              </div>
            )
          default:
            return <h1 className="text-center" key={i}>{item.title}</h1>
        }})
      }
    </>               
  )
}

const GroupBlock = ({ id, layout }) => {
  const { loading, error, data } = useQuery(getGroupContentItems, { variables: { id }})

  console.log({data})

        if (loading) return (
          <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
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
        
          switch (lowerCase(layout)){
          case 'row':
              console.log('Row items:', {blockItems})
              return (
                <Row content={blockItems} />
              )
          case 'accordion':
              console.log('Accordian items:', {blockItems})
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
              console.log('Carousel items:', {blockItems})
              return (
                <Carousel children={blockItems} />
              )
          default:
              return(
                <Row />
              )
          }
        }
      

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
