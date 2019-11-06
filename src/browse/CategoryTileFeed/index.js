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
import ContentCardConnected from '../../content-card-connected'
import { GET_CATEGORY_PREVIEW } from '../queries'


const CategoryTileFeed = ({
    contentId,
    title,
    onSeeMore
}) => {
    const { loading, error, data } = useQuery(GET_CATEGORY_PREVIEW, {
        variables: { id: contentId }
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

    const content = get(data, 'node.childContentItemsConnection.edges', []).map(
        edge => edge.node
    )

    return [
        <div
            className="row mt-4"
        >
            <div className="col-9">
                <h3>
                    {title}
                </h3>
            </div>
            {content.length > 3 &&
                <div className="col-3 text-right">
                    <a
                        href="#"
                        className="h5"
                        onClick={(e) => {
                            e.preventDefault()
                            onSeeMore({ id: contentId, title })
                        }}
                    >
                        See More
                    </a>
                </div>}

        </div>,
        <div 
            className="row mx-n2"
        >
            {content.slice(0, 3).map((n, i) => (
                <ContentCardConnected
                    key={i}
                    contentId={get(n, 'id', '')}
                />
            ))}
        </div>
    ]
}

CategoryTileFeed.propTypes = {
    filter: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    onSeeMore: PropTypes.func
}

CategoryTileFeed.defaultProps = {
    filter: null,
    category: null,
    title: null,
    onSeeMore: () => true
}

export default CategoryTileFeed