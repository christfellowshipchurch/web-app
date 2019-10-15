import React from 'react'
import {
  useQuery
} from 'react-apollo'
import {
  get,
} from 'lodash'

import Loader from '../../../ui/Loader'

import {
  ArticleLinks
} from './'
import {
  GET_TOP_THREE_ARTICLES
} from './queries'

const TopThreeArticles = () => {
  const { loading, error, data } = useQuery(GET_TOP_THREE_ARTICLES,
    {
      fetchPolicy: "cache-and-network"
    })

  if (loading) return <Loader />

  if (error) {
    console.log({ error })
    // TODO : should we show an error? Or should we just redirect to the Articles page?
    return null
  }

  const articles = get(data, 'getArticles', [])

  return articles.length
    ? <ArticleLinks articles={articles} />
    : null
}

TopThreeArticles.propTypes = {
}

TopThreeArticles.defaultProps = {
}

export default TopThreeArticles
