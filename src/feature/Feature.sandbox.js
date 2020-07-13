import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import ContentCardConnected from '../content-card-connected';
import { CardFeed } from '../content-feed';
import { VerticalCardListFeed } from './features';
import {
    useSandbox, HeroCollection, NetflixCollection, NetflixCardFeed,
} from '../sandbox';

export const FeatureSection = ({ children }) => <div className="max-width-1100 mx-auto my-4 px-2">{children}</div>;

const Feature = ({
    title, action, relatedNode, isLoading, index,
}) => {
    const { sandbox } = useSandbox();
    const itemId = get(relatedNode, 'id');

    switch (action) {
        case 'READ_GLOBAL_CONTENT':
            if (sandbox.homeTheme === 'hero') {
                return <HeroCollection itemId={itemId} />;
            }

            if (sandbox.homeTheme === 'netflix') {
                return <NetflixCollection itemId={itemId} />;
            }

            return (
                <FeatureSection>
                    <VerticalCardListFeed itemId={itemId} isLoading={isLoading} />
                </FeatureSection>
            );
        case 'VIEW_CHILDREN':
            if (sandbox.homeTheme === 'hero') {
                return <HeroCollection itemId={itemId} />;
            }

            if (sandbox.homeTheme === 'netflix') {
                return <NetflixCardFeed itemId={itemId} title={title} />;
            }

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
    index: PropTypes.number,
};

Feature.defaultProps = {};

export default Feature;
