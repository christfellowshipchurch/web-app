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
}) => {
    const { loading, error, data } = useQuery(GET_CONTENT_FEED, {
        variables: { itemId: id }
    })
    
    if (loading) return (
        <ContentContainer>
            <Loader/>
        </ContentContainer>
    )

    if (error) {
        console.log({ error })
        return null
    }

    const content = get(data, 'node.childContentItemsConnection.edges', []).map(
        edge => edge.node
    )

    return content.map((n, i) => (
            <ContentCardConnected
                key={i}
                contentId={n.id}
            />
        ))
}

CardFeed.propTypes = {
    id: PropTypes.string,
}

CardFeed.defaultProps = {
    id: null,
}

export default CardFeed