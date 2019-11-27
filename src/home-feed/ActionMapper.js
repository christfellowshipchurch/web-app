import React from 'react'
import PropTypes from 'prop-types'
import { uniq } from 'lodash'

import ContentCardConnected from '../content-card-connected'
import { AnnouncementFeed } from './Features'
import { ContentCard } from '../ui'

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

    // if (actionTypes.length === 1 && actionTypes.includes(ACTION_TYPES.event)) {
    //     // When the only action is to view Events
    //     return <ActionWrapper>
    //         <TileRowCardFeed
    //             title={title}
    //             titleColor={titleColor}
    //             isLoading={isLoading}
    //             actions={actions}
    //         />
    //     </ActionWrapper>
    // } else if (actionTypes.length === 1 && actionTypes.includes(ACTION_TYPES.content)) {
    //     // When the only action is to view Content
    //     return <ActionWrapper>
    //         <TinyCardFeed
    //             title={title}
    //             actions={actions}
    //             isLoading={isLoading}
    //             titleColor={titleColor}
    //         />
    //     </ActionWrapper>
    // }

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
            // return <ActionWrapper key={key}>
            //     <ChildrenFeed
            //         itemId={relatedNode.id}
            //         title={actionTitle}
            //     />
            // </ActionWrapper>
            default:
                CardType = ContentCard
                break
        }

        return !!CardType &&
            <ContentCardConnected
                key={key}
                card={CardType}
                contentId={relatedNode.id}
                isLoading={isLoading}
                coverImage={image}
            />
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