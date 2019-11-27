import React from 'react'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import ContentCardConnected from '../../content-card-connected'
import { HighlightCard } from '../../ui'

import { GET_CONTENT_FEED } from '../../content-feed'
import classnames from 'classnames'

const cardLoadingObject = {
    id: 'fake_id',
    title: '',
    coverImage: [],
}

const RATIO_MAP = {
    '-1': '1by1',
    '0': { xs: '1by1', lg: '4by3' },
    '1': '21by9'
}

const AnnouncementFeed = ({
    itemId,
}) => {
    const {
        loading,
        error,
        data,
    } = useQuery(GET_CONTENT_FEED, {
        fetchPolicy: "cache-and-network",
        variables: {
            itemId,
            first: 4,
            child: true,
            sibling: false,
        }
    })

    if (loading) return <HighlightCard isLoading={loading} {...cardLoadingObject} />

    const content = get(data, 'node.childContentItemsConnection.edges', [])

    return (
        <div className="container">
            <div className="row">
                {content.map(({ node }, i) => {
                    const placement = i === 0
                        ? 0
                        : i === content.length - 1 ? 1 : -1

                    return <div
                        key={`AnnouncementFeed:${i}`}
                        className={classnames(
                            'p-2',
                            {
                                'col-12': placement > -1,
                                'col-6': placement === -1,
                            }
                        )}
                    >
                        <ContentCardConnected
                            contentId={node.id}
                            {...node}
                            card={HighlightCard}
                            ratio={RATIO_MAP[placement]}
                            tile={placement === -1}
                        />
                    </div>
                })}
            </div>
        </div>
    )
}

export default AnnouncementFeed
