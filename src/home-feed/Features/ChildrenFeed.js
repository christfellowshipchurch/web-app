import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { get, kebabCase } from 'lodash'

import {
    ContentContainer,
    Loader,
} from '../../ui'
import ContentCardConnected from '../../content-card-connected'
import { GET_CONTENT_FEED } from '../../content-feed'

const CardFeed = ({
    id,
    urlBase,
    first
}) => {
    const { loading, error, data } = useQuery(GET_CONTENT_FEED, {
        variables: {
            itemId: id,
            first,
            child: true,
            sibling: false,
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

    const content = get(data, `node.childContentItemsConnection.edges`, []).map(
        edge => edge.node
    )
    const title = get(data, 'node.title', '')

    return (
        <div className="container-fluid max-width-1100 my-6 px-4">
            <div className="row">
                <div className="col">
                    <h3 className="text-dark align-self-start">
                        {title}
                    </h3>
                </div>
                {!!urlBase && urlBase !== '' &&
                    <div className="col text-right">
                        <a
                            href={`${urlBase}/${kebabCase(title)}`}
                            className="text-dark align-self-end"
                        >
                            See All
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
    urlBase: PropTypes.string,
    first: PropTypes.number,
}

CardFeed.defaultProps = {
    id: null,
    urlBase: '/content/categories',
    first: 3
}

export default CardFeed