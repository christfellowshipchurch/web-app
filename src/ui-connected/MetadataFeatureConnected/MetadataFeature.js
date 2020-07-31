import React from 'react';
import PropTypes from 'prop-types';


const MetadataFeature = ({ title, meta }) => (
    // TODO : add the meta tags to the website
);

MetadataFeature.propTypes = {
    title: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        content: PropTypes.string,
    })),
};

MetadataFeature.defaultProps = {
    meta: [],
};

export default MetadataFeature;
