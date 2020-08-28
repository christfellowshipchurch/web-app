import React from 'react';
import PropTypes from 'prop-types';

import CampusContentFeatureConnected from '../CampusContentFeatureConnected';
import ContentBlockFeatureConnected from '../ContentBlockFeatureConnected';
import ContentGridFeatureConnected from '../ContentGridFeatureConnected';
import MetadataFeatureConnected from '../MetadataFeatureConnected';

const MAPPINGS = {
    CampusContentFeature: CampusContentFeatureConnected,
    ContentBlockFeature: ContentBlockFeatureConnected,
    ContentGridFeature: ContentGridFeatureConnected,
    MetadataFeature: MetadataFeatureConnected,
};

const pageBuilderComponentMapper = ({
    feature,
    additionalFeatures = {},
}) => {
    const { id, __typename, ...featureData } = feature;
    const map = { ...MAPPINGS, ...additionalFeatures };
    const Component = map[__typename];

    if (Component) {
        return (
            <Component
                featureId={id}
                {...featureData}
            />
        );
    }

    console.warn(
        `No feature found for ${__typename}. Do you need to pass it in via the additionalFeatures prop?`,
    );
    return null;
};

pageBuilderComponentMapper.propTypes = {
    feature: PropTypes.shape({
        userFeedFeatures: PropTypes.arrayOf(PropTypes.shape({})),
    }).isRequired,
    onPressActionItem: PropTypes.func,
    additionalFeatures: PropTypes.shape({}),
    refetchRef: PropTypes.func.isRequired,
};

export default pageBuilderComponentMapper;
