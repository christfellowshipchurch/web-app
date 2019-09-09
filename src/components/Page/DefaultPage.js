import React from 'react'
import PropTypes from 'prop-types'
import {
  useQuery
} from 'react-apollo'
import {
  mapEdgesToNodes,
} from '../../utils'
import getWebPageBlockItems from '../../queries/getWebPageBlockItems'

import SEO from '../../seo'
import PixelManager from '../PixelManager'

import { Loader } from '@christfellowshipchurch/web-ui-kit'
import ContentBlock from '../ui/ContentBlock'
import GroupBlock from '../ui/GroupBlock'


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
