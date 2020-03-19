import React from 'react'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import ContentCardConnected from '../../content-card-connected'
import { Card, TileRowCard } from '../../ui'

import classnames from 'classnames'
import { CARD_PADDING, MARGIN_Y, PADDING_X } from '../'

const cardLoadingObject = {
    id: 'fake_id',
    title: '',
    coverImage: [],
}

const TileRowCardFeed = ({
    title,
    actions,
    isLoading
}) => {
    console.log({actions})
    return (
        <div
            className={classnames(
                "container-fluid",
                MARGIN_Y,
                PADDING_X,
            )}
        >
            <div className="row">
                <div
                    className={classnames(
                        'col',
                        CARD_PADDING,
                    )}
                >
                    <Card
                        loading={isLoading}
                    >
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <h3>
                                        {title}
                                    </h3>
                                </div>
                            </div>
                            <div className="row mx-n2">
                                {actions.map((action, i) =>
                                    <div
                                        key={`TileRowCardFeed:${action.relatedNode.id}`}
                                        className={classnames(
                                            'col-12',
                                            'col-md-6'
                                        )}
                                    >
                                        <ContentCardConnected
                                            contentId={action.relatedNode.id}
                                            card={TileRowCard}
                                            hideLabel={action.hideLabel}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TileRowCardFeed
