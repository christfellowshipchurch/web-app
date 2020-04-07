import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';

import { Loader } from '../ui';
import ActionMapper from './ActionMapper';

import { GET_FEED_FEATURES } from './queries';

export const FeatureSection = ({ children }) => <div className="max-width-1100 mx-auto my-4 px-2">{children}</div>;

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
        <ActionMapper key={`HomeFeedFeature:${i}`} {...n} />
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
