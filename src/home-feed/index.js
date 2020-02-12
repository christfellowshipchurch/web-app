import React from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import gql from 'graphql-tag'

import { Loader, Media } from '../ui'
import ActionMapper from './ActionMapper'

import { useAuthQuery } from '../auth'
import { GET_FEED_FEATURES } from './queries'

const HomeFeed = () => {
    const { loading, error, data } = useAuthQuery(GET_FEED_FEATURES)

    if (error) return <h1 className="text-danger">...oops</h1>

    if (loading) return (
        <div className="w-100 h-100">
            <Loader />
        </div>
    )

    const content = get(data, 'userFeedFeatures', [])

    return content.map((n, i) => <ActionMapper key={`HomeFeedFeature:${i}`} {...n} />)
}

HomeFeed.propTypes = {

}

HomeFeed.defaultProps = {

}


export default HomeFeed
export const CARD_PADDING = 'p-0'
export const MARGIN_Y = 'my-4'
export const PADDING_X = 'px-3'