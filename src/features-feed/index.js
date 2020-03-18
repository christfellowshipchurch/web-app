import React from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import gql from 'graphql-tag';

import { Loader, Media } from '../ui';
import ActionMapper from './ActionMapper';

import { useAuthQuery } from '../auth';
import { GET_FEED_FEATURES } from './queries';

const FeatureFeed = () => {
    const { loading, error, data } = useQuery(GET_FEED_FEATURES, { fetchPolicy: 'cache-and-network' });


    if (error) return <h1 className="text-danger">...oops</h1>;

    if (loading) {
        return (
            <div className="w-100 h-100">
                <Loader />
            </div>
        );
    }

    const content = get(data, 'userFeedFeatures', []);

    return content.map((n, i) => (
        <div className="max-wdith-1100 mx-auto my-4 px-2">
            <ActionMapper key={`HomeFeedFeature:${i}`} {...n} />
        </div>
    ));
};

FeatureFeed.propTypes = {

};

FeatureFeed.defaultProps = {

};


export default FeatureFeed;
export const CARD_PADDING = 'p-0';
export const MARGIN_Y = 'my-4';
export const PADDING_X = 'px-3';
