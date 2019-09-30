import React from 'react'
import {
  useQuery
} from 'react-apollo'
import {
  get, has, toLower, kebabCase
} from 'lodash'

import { Loader, Media } from '@christfellowshipchurch/web-ui-kit'
import { GET_ALL_ARTICLES } from './queries'

const ArticleList = ({ }) => {
  const { loading, error, data } = useQuery(GET_ALL_ARTICLES)

  if (loading) return <Loader />

  if (error) {
    console.log({ error })
    // TODO : should we show an error? Or should we just redirect to the Articles page?
    return <h3 className="text-center text-danger">
      There was an error loading this content. Try refreshing the page.
    </h3>
  }

  const articles = get(data, 'getArticles', [])

  return (
    <div className="container py-6">
      <div className="row">
        <div className="col text-center">
          <h3>Click on an article below to read it</h3>
        </div>
      </div>
      <div className="row">
        {articles.map((n, i) => (
          <div className="col-6 col-md-4 p-3" key={i}>
            <div className="card h-100">
              <Media
                className="card-img-top"
                imageUrl={get(n, 'images[0].sources[0].uri', '')}
                imageAlt={`Christ Fellowship Church - ${get(n, 'title', '')}`}
                ratio="16by9"
              />

              <div className="card-body">
                <h5 className="card-title">
                  {get(n, 'title', 'Christ Fellowship Church')}
                </h5>
                <p className="card-text">
                  {`${get(n, 'summary', '').substring(0, 100)}...`}
                </p>
                {has(n, 'title') &&
                  <a href={`${kebabCase(toLower(get(n, 'title', '')))}/`}>
                    Read article
                  </a>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

ArticleList.propTypes = {
}

ArticleList.defaultProps = {
}

export default ArticleList
