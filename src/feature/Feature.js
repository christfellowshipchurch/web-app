import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import ContentCardConnected from '../content-card-connected';
import { CardFeed } from '../content-feed';
import { GridFeed } from './features';

export const FeatureSection = ({ children }) => <div className="max-width-1100 mx-auto my-4 px-2">{children}</div>;

const Feature = ({
    title, action, relatedNode, isLoading,
}) => {
    const itemId = get(relatedNode, 'id');
    switch (action) {
        case 'READ_GLOBAL_CONTENT':
            return <FeatureSection><GridFeed itemId={itemId} isLoading={isLoading} /></FeatureSection>;
        case 'VIEW_CHILDREN':
            return (
                <FeatureSection>
                    <CardFeed title={title} id={itemId} isLoading={isLoading} />
                </FeatureSection>
            );
        default:
            return <ContentCardConnected contentId={itemId} isLoading={isLoading} />;
    }
};

Feature.propTypes = {
    title: PropTypes.string,
    action: PropTypes.string,
    relatedNode: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
    isLoading: PropTypes.bool,
};

Feature.defaultProps = {};

export default Feature;
