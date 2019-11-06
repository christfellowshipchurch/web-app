import React from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import {
    get,
    take
} from 'lodash'

import {
    Loader,
    ContentContainer,
} from '../../ui'

import CategoryTileFeed from '../CategoryTileFeed'
import { GET_CATEGORIES_FROM_FILTER } from '../queries'

const CategoryList = ({
    filterId,
    onClick,
}) => {
    const { loading, error, data } = useQuery(GET_CATEGORIES_FROM_FILTER, {
        variables: { id: filterId }
    })

    if (loading) return (
        <ContentContainer style={{height:'200px'}} >
            <Loader/>
        </ContentContainer>
    )

    if (error) {
        console.log({ error })
        return null
    }

    const categories = get(data, 'node.childContentItemsConnection.edges', []).map(
        edge => edge.node
    )

    return (
        <div className="container-fluid my-6">
            {categories.map((n, i) => {
                return <CategoryTileFeed
                    key={i}
                    contentId={get(n, 'id', '')}
                    title={get(n, 'title', '')}
                    onSeeMore={onClick}
                />
            })}
        </div>
    )
}

CategoryList.propTypes = {
    filter: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func
}

CategoryList.defaultProps = {
    filter: null,
    category: null,
    title: null,
    onClick: () => true
}

export default CategoryList