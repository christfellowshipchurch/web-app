import React from 'react'
import {
  useQuery
} from 'react-apollo'
import {
  get, has, toLower
} from 'lodash'
import moment from 'moment'

import { Media, Block, Loader } from '@christfellowshipchurch/web-ui-kit'
import { GET_ARTICLE_BY_TITLE } from './queries'

const DATE_FORMAT = 'MMMM D, YYYY'

const ArticleDetail = ({ match: { params: { articleTitle } } }) => {
  const { loading, error, data } = useQuery(GET_ARTICLE_BY_TITLE,
    {
      variables: {
        title: toLower(articleTitle)
      }
    })

  if (loading) return <Loader />

  if (error) {
    console.log({ error })
    // TODO : should we show an error? Or should we just redirect to the Articles page?
    return <h3 className="text-center text-danger">
      There was an error loading this content. Try refreshing the page.
    </h3>
  }

  const article = get(data, 'getArticleByTitle', null)

  if (!article) {
    console.error('Null was returned from the server')
    return <h3 className="text-center text-danger">
      There was an error loading this content. Try refreshing the page.
    </h3>
  }

  return (
    <Block className='my-6 max-width-800'>
      {get(article, 'title', '') !== '' &&
        <Block.Title className='mb-1 text-dark'>
          {article.title}
        </Block.Title>
      }

      {get(article, 'summary', '') !== '' &&
        <Block.Subtitle className='mt-1 article-subtitle font-weight-light'>
          {article.summary}
        </Block.Subtitle>
      }

      {get(article, 'images[0].sources[0].uri') !== '' &&
        <Media
          rounded
          ratio="16by9"
          imageUrl={article.images[0].sources[0].uri}
          imageAlt={get(article, 'title', 'Christ Fellowship Church')}
          className='my-4'
        />
      }

      {(has(article, 'author') || get(article, 'readTime', '') !== '') &&
        <div className='py-4 d-flex align-items-center'>
          {get(article, 'author.photo.uri', '') !== '' &&
            <Media
              circle
              ratio="1by1"
              imageUrl={get(article, 'author.photo.uri', '')}
              imageAlt={`${get(article, 'author.person.firstName')} ${get(article, 'author.person.lastName')}`}
              className='author-image mr-3'
            />
          }
          <div className='text-left d-flex flex-column'>
            <p className='my-1 font-weight-bold text-dark'>
              {`${get(article, 'author.firstName', '')} ${get(article, 'author.lastName', '')}`}
            </p>
            <p className='my-1 mb-0 font-weight-light'>
              {`${get(article, 'date', moment().format(DATE_FORMAT))}  •  ${get(article, 'readTime', '2')} min`}
            </p>
          </div>
        </div>
      }

      {get(article, 'htmlContent', '') !== '' &&
        <Block.Body className="article-body my-3 font-weight-light pb-4 text-left">
          {article.htmlContent}
        </Block.Body>
      }
    </Block>
  )
}

ArticleDetail.propTypes = {
}

ArticleDetail.defaultProps = {
}

export default ArticleDetail