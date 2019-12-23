import React from 'react'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import ContentCardConnected from '../../content-card-connected'
import { ContentCard } from '../../ui'

import classnames from 'classnames'
import { CARD_PADDING, MARGIN_Y, PADDING_X } from '../'

const CardRow = ({
    title,
    actions
}) => {

    return (
        <div
            className={classnames(
                "container-fluid",
                MARGIN_Y,
                PADDING_X,
            )}
        >
            <div className="row">
                <div className="col-10 pl-2">
                    <h3>
                        {title}
                    </h3>
                </div>
                <div className="col-2 text-right pr-2">
                    <a href='/browse' className="text-dark">
                        See All
                    </a>
                </div>
            </div>
            <div className="row">
                {actions.map(({ relatedNode }, i) => {
                    return <ContentCardConnected
                        key={`CardRow:${relatedNode.id}`}
                        contentId={relatedNode.id}
                    />
                })}
            </div>
        </div>
    )
}

export default CardRow
