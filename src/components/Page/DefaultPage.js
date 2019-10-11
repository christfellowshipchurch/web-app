import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  useQuery
} from 'react-apollo'
import {
  mapEdgesToNodes,
} from '../../utils'
import getWebPageBlockItems from '../../queries/getWebPageBlockItems'

import SEO from '../../seo'
import PixelManager from '../PixelManager'

import Loader from '../../ui/Loader'

// import ContentContainer from ''
import {  
  Block,
  BackgroundContentBlock,
  GroupBlock,
} from '../../ui'
import { Feature } from '../features'
import { get, camelCase, lowerCase } from 'lodash'


const DefaultPage = ({ title, match: { params: { page } } }) => {
  PixelManager.initWithPageView(`/${page || ''}`)

  const website = process.env.REACT_APP_WEBSITE_KEY
  const pageTitle = page || title
  const isHomePage = pageTitle === ''
    || pageTitle === 'home'
    || pageTitle === 'home-page'
    || pageTitle === '/'
    || pageTitle === 'home/'
    || pageTitle === 'home-page/'

  const { loading, error, data } = useQuery(getWebPageBlockItems, { variables: { website, title: pageTitle } })

  if (loading) return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-white">
      <Loader />
    </div>
  )

  if (error) {
    console.error("ERROR: ", { error })
    return <h1 className="text-center">There was an error loading the page. Please try again.</h1>
  }

  const bgColor = {
    'true': isHomePage ? 'bg-white' : 'bg-transparent',
    'false': isHomePage ? 'bg-transparent' : 'bg-white'
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
        const id = lowerCase(get(item, 'title', '')).replace(/\s/g, '-')
        const bg = bgColor[`${bgFirst}`]
        const topPadding = i === 0 ? 'pt-5' : ''
        let content = null

        if (!camelCase(get(item, 'contentLayout', '')).includes('background'))
          bgFirst = !bgFirst

        switch (item.__typename) {
          case 'WebsiteBlockItem':
            if (camelCase(get(item, 'contentLayout', '')).includes('background')) {
              content = <BackgroundContentBlock {...item} className={topPadding} />
            } else {
              content = (
                          <Block {...item} className={topPadding} />
                        )
            }
            break
          case 'WebsiteGroupItem':
            content = <div
              className={classnames("col", topPadding)}
            >
              <GroupBlock {...item} />
            </div>
            break
          case 'WebsiteFeature':
            content = (
              <div className={classnames("col", 'px-4', topPadding)}>
                <Feature name={get(item, 'feature', '')} background={bg} />
              </div>
            )
            break
          default:
            content = <h1 className={classnames("text-center", topPadding)}>{item.title}</h1>
            break
        }

        return (
          <div id={id} className={`row ${bg}`} key={i}>
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
