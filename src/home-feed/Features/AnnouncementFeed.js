import React from 'react'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import ContentCardConnected from '../../content-card-connected'
import { ContentCard, HighlightCard, ContentContainer } from '../../ui'

import { GET_CONTENT_FEED } from '../../content-feed'
import classnames from 'classnames'
import { CARD_PADDING, MARGIN_Y, PADDING_X } from '../'

const cardLoadingObject = {
    id: 'fake_id',
    title: '',
    coverImage: [],
}

const RATIO_MAP = {
    '-1': '4by3',
    '0': { xs: '1by1', lg: '16by9' },
    '1': '21by9'
}

const StyledHighlightCard = ({style, ...props}) => <HighlightCard {...props} style={{maxHeight:450, ...style}} />

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

    if (loading) return <ContentContainer className='max-width-800 p-4'>
        <HighlightCard isLoading={loading} {...cardLoadingObject} />
    </ContentContainer>

    const content = get(data, 'node.childContentItemsConnection.edges', [])

    return (
        <div
            className={classnames(
                "container-fluid",
                MARGIN_Y,
                PADDING_X,
            )}
        >
            <div className="row">
                {content.map(({ node }, i) => {
                    const placement = i === 0
                        ? 0
                        : i === content.length - 1 ? 1 : -1
                    

                    return <div
                        key={`AnnouncementFeed:${i}`}
                        className={classnames(
                            CARD_PADDING,
                            'col-12',
                            {
                                'col-md-6': placement === -1,
                            }
                        )}
                    >
                        <ContentCardConnected
                            contentId={node.id}
                            {...node}
                            card={placement === 0 ? HighlightCard : ContentCard}
                            ratio={RATIO_MAP[placement]}
                            tile={placement === -1}
                            row={placement === 1}
                            style={placement === 0 ? { maxHeight: 450} : {}}
                        />
                    </div>
                })}
            </div>
        </div>
    )
}

export default AnnouncementFeed
