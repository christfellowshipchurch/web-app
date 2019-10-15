import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  get,
  toLower,
  kebabCase
} from 'lodash'

import Media from '../../../ui/Media'

const ArticleLinks = ({ articles }) => (
  <div className="container-fluid max-width-1100 my-6 px-3">
    <div className="row">
      <div className="col">
        <h3 className="text-dark align-self-start">
          Related Articles
        </h3>
      </div>
      <div className="col text-right">
        <a
          href="/articles"
          className="text-dark align-self-end"
        >
          See More
        </a>
      </div>
    </div>
    <div className="row">
      {articles.map((n, i) => (
        <a
          key={i}
          href={`/articles/${kebabCase(toLower(get(n, 'title', '')))}`}
          className={classnames(
            'col-12',
            'col-md-4',
            'py-1',
            {
              'pr-1': i < articles.length - 1 && articles.length !== 1,
              'pl-1': i === articles.length - 1 && articles.length !== 1,
            },
            'text-white'
          )}
        >
          <Media
            ratio="1by1"
            imageUrl={get(n, 'images[0].sources[0].uri')}
            imageAlt={get(n, 'title', 'Christ Fellowship Church')}
            rounded
          >
            <div
              className={classnames(
                'w-100',
                'h-100',
                'p-3',
                'd-flex',
                'flex-row',
                'align-items-end'
              )}
              style={{ zIndex: 2 }}
            >
              <div>
                <h3>
                  {get(n, 'title', '')}
                </h3>
              </div>
            </div>
            <div
              className="p-absolute w-100 h-100"
              style={{
                top: 0,
                left: 0,
                overflow: 'hidden',
                background: 'rgba(0, 0, 0, 0.4)',
                zIndex: 0
              }}>
            </div>
          </Media>
        </a>
      ))}
    </div>
  </div >
)

ArticleLinks.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object)
}

ArticleLinks.defaultProps = {
  articles: []
}

export default ArticleLinks