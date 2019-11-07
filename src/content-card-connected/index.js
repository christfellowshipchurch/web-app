import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'

import { ContentCard } from '../ui'
import GET_CONTENT_CARD from './queries'

export { TILE_CARD_FRAGMENT, LARGE_CARD_FRAGMENT } from './queries'

const ContentCardConnectedWithQuery = ({
    contentId,
    tile,
    card,
    ...otherProps
}) => {
    const { loading, error, data } = useQuery(GET_CONTENT_CARD,
        { variables: { contentId, tile } }
    )

    if (error) return null

    const node = get(data, 'node', {})
    const metrics = [
        {
            icon: node.isLiked ? 'like-solid' : 'like',
            value: node.likedCount,
        },
    ]
    const coverImage = get(node, 'coverImage.sources', undefined)

    return React.createElement(
        card,
        {
            ...node,
            ...otherProps,
            coverImage,
            metrics,
            tile,
            isLoading: loading
        }
    )
}

const ContentCardConnected = ({
    contentId,
    isLoading,
    tile,
    card = ContentCard,
    ...otherProps
}) => {
    if (!contentId || isLoading)
        return React.createElement(
            card,
            {
                ...otherProps,
                tile,
                isLoading: true
            }
        )

    return <ContentCardConnectedWithQuery
        contentId={contentId}
        tile={tile}
        card={card}
        {...otherProps}
    />
}

ContentCardConnected.propTypes = {
    isLoading: PropTypes.bool,
    contentId: PropTypes.string,
    tile: PropTypes.bool,
    card: PropTypes.func
}

ContentCardConnected.defaultProps = {
    card: ContentCard,
    tile: false
}

export default ContentCardConnected
