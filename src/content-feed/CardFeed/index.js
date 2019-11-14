import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/fontawesome-pro-regular'

import {
    ContentContainer,
    Loader,
    ContentCard
} from '../../ui'
import ContentCardConnected from '../../content-card-connected'
import { GET_CONTENT_FEED } from '../queries'

const CardFeed = ({
    id,
    title,
    connection,
    urlBase,
    top
}) => {
    const { loading, error, data } = useQuery(GET_CONTENT_FEED, {
        variables: {
            itemId: id,
            top,
            child: connection === "child",
            sibling: connection === "sibling",
        }
    })

    if (loading) return (
        <ContentContainer>
            <Loader />
        </ContentContainer>
    )

    if (error) {
        console.log({ error })
        return null
    }

    const content = get(data, `node.${connection}ContentItemsConnection.edges`, []).map(
        edge => edge.node
    )

    return (
        <div className="container-fluid max-width-1100 my-6 px-3">
            <div className="row">
                <div className="col">
                    <h3 className="text-dark align-self-start">
                        {title}
                    </h3>
                </div>
                {!!urlBase && urlBase !== '' &&
                    <div className="col text-right">
                        <a
                            href={`/${urlBase}`}
                            className="text-dark align-self-end"
                        >
                            See More
                        </a>
                    </div>
                }
            </div>
            <div className="row mx-n1">
                {content.map((n, i) => (
                    <ContentCardConnected
                        key={i}
                        contentId={n.id}
                        urlBase={urlBase}
                    />
                ))}
            </div>
        </div>
    )
}

CardFeed.propTypes = {
    id: PropTypes.string,
    connection: PropTypes.oneOf([
        'child',
        'sibling'
    ]),
    title: PropTypes.string,
    top: PropTypes.number,
}

CardFeed.defaultProps = {
    id: null,
    connection: 'child'
}

export default CardFeed