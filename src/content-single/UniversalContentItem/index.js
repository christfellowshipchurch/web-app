import React from 'react'
import PropTypes from 'prop-types'
import {
  get
} from 'lodash'
import { htmlToReactParser } from '../../utils'
import {
  Media,
} from '../../ui'
import Placeholder from './Placeholder'

import Author from '../Author'
import RelatedArticles from './RelatedContent'
import ArticleCategories from './ContentCategories'


const ArticleDetail = ({
  itemId,
  loading,
  error,
  content,
}) => {
  if (loading) return <Placeholder />

  if (error) {
    console.log({ error })
    // TODO : should we show an error? Or should we just redirect to the Articles page?
    return (
      <h3 className="text-center text-danger">
        There was an error loading this content. Try refreshing the page.
      </h3>
    )
  }
  const bodyText = get(content, 'htmlContent', '')

  const categoryTags = get(content, 'tags', [])

  if (!content) {
    console.error('Articles: Null was returned from the server')
    return (
      <h3 className="text-center text-danger">
        There was an error loading this content. Try refreshing the page.
      </h3>
    )
  }

  return (
    <>
      <div className="pt-6 bg-white px-3">
        <div className="container">
          <div className="row">
            <div className="col">
              {get(content, 'title', '') !== ''
                && (
                  <h1 className="mb-2 text-dark">
                    {content.title}
                  </h1>
                )}

              {get(content, 'summary', '') !== ''
                && (
                  <h2 className="mt-1 content-subtitle font-weight-light">
                    {content.summary}
                  </h2>
                )}

              {get(content, 'coverImage.sources[0].uri') !== ''
                && (
                  <Media
                    rounded
                    showControls
                    ratio="16by9"
                    imageUrl={get(content, 'coverImage.sources[0].uri', '')}
                    videoUrl={get(content, 'videos[0].sources[0].uri', '')}
                    imageAlt={get(content, 'title', 'Christ Fellowship Church')}
                    className="my-4"
                  />
                )}

              {/* TODO : add some sort of default photo/icon */}
              <Author contentId={itemId} />

              {get(content, 'htmlContent', '') !== ''
                && (
                  <div className="content-body my-3 pb-4 text-left">
                    {htmlToReactParser.parse(bodyText)}
                  </div>
                )}
            </div>
          </div>
          {/* Category tags */}
          {categoryTags.length > 0
            && (
              <div className="row pb-6">
                <div className="col-12">
                  <h4
                    className="text-uppercase text-muted"
                    style={{ fontWeight: 900, letterSpacing: 2 }}
                  >
                    categories
                  </h4>
                </div>
                <div className="col-12">
                  <ArticleCategories categories={categoryTags} />
                </div>
              </div>
            )}
        </div>
      </div>
      <RelatedArticles id={get(content, 'id')} />
    </>
  )
}

ArticleDetail.propTypes = {
  itemId: PropTypes.string,
}

ArticleDetail.defaultProps = {
}

export default ArticleDetail
