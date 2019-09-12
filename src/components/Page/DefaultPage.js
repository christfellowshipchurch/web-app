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
import ContentContainer from '../ui/ContentContainer'
import ContentBlock from '../ui/ContentBlock'
import BackgroundContentBlock from '../ui/BackgroundContentBlock'
import GroupBlock from '../ui/GroupBlock'
import { Feature } from '../features'
import { get, camelCase } from 'lodash'


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

  const bgColor = {
    'true': 'bg-white',
    'false': 'bg-light'
  }
  let bgFirst = true
  const blockItems = mapEdgesToNodes(data.getWebsitePageContentByTitle.childContentItemsConnection)
  const {
    metaDescription,
    metaKeywords,
    openGraphProtocols,
    twitterProtocols,
  } = blockItems

  return (
    <div className="container-fluid">
      <SEO
        title={`${page || title} - Christ Fellowship Church`}
        description={metaDescription}
        keywords={metaKeywords}
        openGraphProtocols={openGraphProtocols}
        twitterProtocols={twitterProtocols}
      />

      {blockItems.map((item, i) => {
        const bg = bgColor[`${bgFirst}`]
        let content = null

        if (!camelCase(get(item, 'contentLayout', '')).includes('background'))
          bgFirst = !bgFirst

        switch (item.__typename) {
          case 'WebsiteBlockItem':
            if (camelCase(get(item, 'contentLayout', '')).includes('background')) {
              content = <BackgroundContentBlock {...item} />
            } else {
              content = <ContentBlock {...item} />
            }
            break
          case 'WebsiteGroupItem':
            content = <div className="col"><GroupBlock {...item} /></div>
            break
          case 'WebsiteFeature':
            content = (
              <div className="col px-4">
                <Feature name={get(item, 'feature', '')} />
              </div>
            )
            break
          default:
            content = <h1 className="text-center">{item.title}</h1>
            break
        }

        return (
          <div className={`row ${bg}`} key={i}>
            {content}
          </div>
        )
      })}
    </div>
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
