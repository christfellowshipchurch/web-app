import React from 'react'
import PropTypes from 'prop-types'
import {
  useQuery
} from 'react-apollo'
import {
  get,
} from 'lodash'

import {
  Loader,
} from '@christfellowshipchurch/web-ui-kit'
import {
  ArticleLinks,
  TopThreeArticles
} from './'
import {
  GET_RELATED_ARTICLES,

} from './queries'

const RelatedArticles = ({ id }) => {
  const { loading, error, data } = useQuery(GET_RELATED_ARTICLES,
    {
      variables: { id },
      fetchPolicy: "cache-and-network"
    })

  if (loading) return <Loader />

  if (error) {
    console.log({ error })
    return <TopThreeArticles />
  }

  const articles = get(data, 'node.siblingContentItemsConnection.edges', [])
    .map(({ node }) => node)

  return articles.length
    ? <ArticleLinks articles={articles} />
    : <TopThreeArticles />
}

RelatedArticles.propTypes = {
  id: PropTypes.string.isRequired
}

RelatedArticles.defaultProps = {
}

export default RelatedArticles
