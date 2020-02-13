import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  useQuery
} from 'react-apollo'
import {
  get
} from 'lodash'

import {
  Button
} from '../ui'
import {
  GET_ARTICLE_CATEGORIES,
} from './queries'


const ArticleCategories = ({
  categories
}) => {
  return (
    categories.map((n, i) => n !== '' &&
      <Button
        key={i}
        title={n}
        type="dark"
        size="sm"
        className={
          classnames(
            { 'mx-2': i !== 0 }
          )}
        disabled
      />
    )
  )
}

ArticleCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.string
  )
}

ArticleCategories.defaultProps = {
  categories: []
}

export default ArticleCategories
