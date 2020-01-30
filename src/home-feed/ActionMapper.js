import React from 'react'
import PropTypes from 'prop-types'
import { uniq, take, kebabCase } from 'lodash'

import { CardFeed } from '../content-feed'
import ContentCardConnected from '../content-card-connected'
import { AnnouncementFeed, TileRowCardFeed, CardRow, ChildrenFeed } from './Features'
import { ContentCard } from '../ui'
import classnames from 'classnames'
import { CARD_PADDING, MARGIN_Y } from './'

const ACTION_TYPES = {
    event: 'READ_EVENT',
    content: 'READ_CONTENT',
    global: 'READ_GLOBAL_CONTENT',
    children: 'VIEW_CHILDREN'
}

const ActionMapper = ({
    title,
    subtitle,
    actions,
    navigation,
    image,
    isLoading
}) => {
    const actionTypes = uniq(actions.map(({ action }) => action))

    if (actionTypes.length === 1 && actionTypes.includes(ACTION_TYPES.event)) {
        // When the only action is to view Events
        return <TileRowCardFeed
            title={title}
            isLoading={isLoading}
            actions={take(actions, 4)}
        />
    } else if (actionTypes.length === 1 && actionTypes.includes(ACTION_TYPES.content)) {
        // When the only action is to view Content
        return <CardRow
            title={title}
            actions={take(actions, 3)}
            isLoading={isLoading}
        />
    }

    return actions.map(({ title: actionTitle, action, relatedNode }, i) => {
        const key = `ActionMapper:${i}`
        let CardType = null

        switch (action) {
            case ACTION_TYPES.global:
                // break
                return <AnnouncementFeed
                    key={key}
                    itemId={relatedNode.id}
                />
            case ACTION_TYPES.children:
                return <div
                    key={`CardFeed:${relatedNode.id}`}
                    className={classnames(
                        'container-fluid',
                        MARGIN_Y
                    )}
                >
                    <div className="row">
                        <div className="col">
                            <ChildrenFeed
                                id={relatedNode.id}
                                first={3}
                            />
                        </div>
                    </div>
                </div>
            default:
                CardType = ContentCard
                break
        }

        return !!CardType && <div
            key={`HomeFeedCard:${key}`}
            className="container-fluid"
        >
            <div className="row">
                <div className={classnames('col', CARD_PADDING)}>
                    <ContentCardConnected
                        card={CardType}
                        contentId={relatedNode.id}
                        isLoading={isLoading}
                        coverImage={image}
                    />
                </div>
            </div>
        </div>
    })
}

ActionMapper.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.array,
    isLoading: PropTypes.bool
}

ActionMapper.defaultProps = {
    title: '',
    actions: []
}

export default ActionMapper