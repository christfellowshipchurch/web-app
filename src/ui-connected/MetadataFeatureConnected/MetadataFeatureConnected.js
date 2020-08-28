import React from 'react';
import PropTypes from 'prop-types';

import MetadataFeature from './MetadataFeature';

const MetadataFeatureConnected = ({ title, meta }) => (
    <MetadataFeature
        title={title}
        meta={meta}
    />
);

MetadataFeatureConnected.propTypes = {
    title: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string,
    })),
};

MetadataFeatureConnected.defaultProps = {
    meta: [],
};

export default MetadataFeatureConnected;
