import React from 'react'
import PropTypes from 'prop-types'
import { uniq, take, kebabCase } from 'lodash'

import classnames from 'classnames'
import { CardFeed } from '../content-feed'
import ContentCardConnected from '../content-card-connected'
import {
    AnnouncementFeed, TileRowCardFeed, CardRow, ChildrenFeed,
} from './Features'
import { ContentCard } from '../ui'
import { CARD_PADDING, MARGIN_Y, FeatureSection } from '.'

const ACTION_TYPES = {
    event: 'READ_EVENT',
    content: 'READ_CONTENT',
    global: 'READ_GLOBAL_CONTENT',
    children: 'VIEW_CHILDREN',
}

const ActionMapper = ({
    title,
    actions,
    image,
    isLoading,
}) => {
    const actionTypes = uniq(actions.map(({ action }) => action))

    if (actionTypes.length === 1 && actionTypes.includes(ACTION_TYPES.event)) {
        // When the only action is to view Events
        return (
            <FeatureSection>
                <TileRowCardFeed
                    title={title}
                    isLoading={isLoading}
                    actions={take(actions, 4)}
                />
            </FeatureSection>
        )
    } if (actionTypes.length === 1 && actionTypes.includes(ACTION_TYPES.content)) {
        // When the only action is to view Content
        return (
            <FeatureSection>
                <CardRow
                    title={title}
                    actions={take(actions, 3)}
                    isLoading={isLoading}
                />
            </FeatureSection>
        )
    }

    return actions.map(({ title: actionTitle, action, relatedNode }, i) => {
        const key = `ActionMapper:${i}`
        let CardType = null

        switch (action) {
            case ACTION_TYPES.global:
                // break
                return (
                    <FeatureSection key={key}>
                        <AnnouncementFeed
                            itemId={relatedNode.id}
                        />
                    </FeatureSection>
                )
            case ACTION_TYPES.children:
                return (
                    <FeatureSection key={key}>
                        <CardFeed
                            id={relatedNode.id}
                            connection="child"
                            title={actionTitle}
                            first={3}
                            urlBase={`content/collection/${kebabCase(actionTitle)}-${relatedNode.id.split(':').pop()}`}
                        />
                    </FeatureSection>
                )
            default:
                CardType = ContentCard
                break
        }

        return !!CardType && (
            <FeatureSection key={key}>
                <div
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
            </FeatureSection>
        )
    })
}

ActionMapper.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.array,
    isLoading: PropTypes.bool,
}

ActionMapper.defaultProps = {
    title: '',
    actions: [],
}

export default ActionMapper
