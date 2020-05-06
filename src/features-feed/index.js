import React from 'react';
import { useQuery } from 'react-apollo';
import classnames from 'classnames';
import { get } from 'lodash';

import { Loader } from '../ui';
import ActionMapper from './ActionMapper';

import { GET_FEED_FEATURES } from './queries';
import { useSandbox } from '../sandbox';

export const FeatureSection = ({ children }) => <div className="max-width-1100 mx-auto my-4 px-2">{children}</div>;

const FeatureFeed = () => {
    const { sandbox, setSandboxValue, sandboxEnabled } = useSandbox({ homeTheme: 'default' });
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

    return (
        <div>
            {content.map((n, i) => (
                <ActionMapper key={`HomeFeedFeature:${i}`} {...n} />
            ))}
            {sandboxEnabled && (
                <div
                    className={classnames('form-group', 'opacity-65')}
                    style={{
                        position: 'fixed',
                        bottom: 10,
                        left: 10,
                        zIndex: 1000,
                    }}
                >
                    <select
                        value={sandbox.homeFeed}
                        className={classnames('form-control')}
                        onChange={(e) => setSandboxValue('homeTheme', e.target.value)}
                    >
                        <option value="default">Default Theme</option>
                        <option value="highlight">Highlight Card Theme</option>
                        <option value="hero">Hero Theme</option>
                        <option value="netflix">Netflix Theme</option>
                    </select>
                </div>
            )}
        </div>
    );
};

FeatureFeed.propTypes = {

};

FeatureFeed.defaultProps = {

};


export default FeatureFeed;
export const CARD_PADDING = 'p-0';
export const MARGIN_Y = 'my-4';
export const PADDING_X = 'px-3';
