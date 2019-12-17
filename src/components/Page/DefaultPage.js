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
import { useAuth } from '../../auth'

// import ContentContainer from ''
import {
  Block,
  BackgroundContentBlock,
  GroupBlock,
} from '../../ui'
import { Feature } from '../features'
import { get, camelCase, lowerCase } from 'lodash'


const bgColor = {
  'true': 'bg-transparent',
  'false': 'bg-white',
  'accordion': 'bg-transparent',
}

const DefaultPage = ({ title, match: { params: { page } }, showLogIn }) => {
  PixelManager.initWithPageView(`/${page || ''}`)

  const website = process.env.REACT_APP_WEBSITE_KEY
  const pageTitle = page || title

  const { loading, error, data } = useQuery(getWebPageBlockItems, { variables: { website, title: pageTitle } })

  if (loading) return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
      <Loader />
    </div>
  )

  if (error) {
    console.error("ERROR: ", { error })
    return <h1 className="text-center">There was an error loading the page. Please try again.</h1>
  }

  let bgIndex = true

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
        const bg = bgColor[`${bgIndex}`]
        let content = null

        if (!camelCase(get(item, 'contentLayout', '')).includes('background'))
          bgIndex = !bgIndex

        switch (item.__typename) {
          case 'WebsiteBlockItem':
            if (camelCase(get(item, 'contentLayout', '')).includes('background')) {
              content = <BackgroundContentBlock {...item} />
            } else {
              content = (
                <Block {...item} className={topPadding} />
              )
            }
            break
          case 'WebsiteGroupItem':
            content = <div
              className={classnames("col")}
            >
              <GroupBlock {...item} />
            </div>
            break
          case 'WebsiteFeature':
            content = (
              <div className={classnames("col", 'px-4')}>
                <Feature name={get(item, 'feature', '')} background={bg} />
              </div>
            )
            break
          default:
            content = <h1 className={classnames("text-center")}>{item.title}</h1>
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
  showLogIn: false
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
