import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'

import { ContentCard } from '../ui'
import GET_CONTENT_CARD from './queries'
import { formatDate } from '../utils'

export { TILE_CARD_FRAGMENT, LARGE_CARD_FRAGMENT } from './queries'

const ContentCardConnectedWithQuery = ({
    contentId,
    tile,
    card,
    label,
    ...otherProps
}) => {
    const { loading, error, data } = useQuery(GET_CONTENT_CARD,
        { variables: { contentId, tile: false } }
    )

    if (error) return null

    const node = get(data, 'node', {})
    const typename = get(node, '__typename', '')
    const metrics = [
        {
            icon: node.isLiked ? 'like-solid' : 'like',
            value: node.likedCount,
        },
    ]
    const coverImage = get(node, 'coverImage.sources', undefined)
    const labelValue = typeof label.field === 'string'
        ? get(node, label.field, '')
        : label.field(node)

    return React.createElement(
        card,
        {
            ...node,
            ...otherProps,
            coverImage,
            metrics,
            tile,
            isLoading: loading,
            label: {
                value: typename === 'EventContentItem'
                    ? formatDate(node)
                    : labelValue,
                ...label
            },
            urlBase: typename === 'EventContentItem'
                ? 'events'
                : get(otherProps, 'baseUrl', 'content')
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
    card: PropTypes.func,
    label: PropTypes.shape({
        field: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        bg: PropTypes.string,
        textColor: PropTypes.string,
    })
}

ContentCardConnected.defaultProps = {
    card: ContentCard,
    tile: false,
    label: {
        field: 'tags[0]',
        bg: 'dark',
        textColor: 'white',
    }
}

export default ContentCardConnected
