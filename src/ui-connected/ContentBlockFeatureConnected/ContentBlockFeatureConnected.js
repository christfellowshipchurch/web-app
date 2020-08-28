import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Block, Media } from 'ui';

const DISPLAY_LAYOUT_MAP = {
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'default',
    BOTTOM: 'inverted',
};

// TODO : make this a truly 'Connected' component
const ContentBlockFeatureConnected = ({ id, content, display }) => {
    if (display === 'BACKGROUND_IMAGE') {
        return (
            <Media
                key={id}
                imageUrl={get(content, 'image.sources[0].uri', '')}
                imageAlt={`Christ Fellowship Church - ${get(content, 'title', '')}`}
                className="text-white"
                overlay="black"
            >
                <Block
                    withAnimation
                    contentLayout="default"
                    variant="dark"
                    {...content}
                />
            </Media>
        );
    }

    return <Block key={id} {...content} contentLayout={DISPLAY_LAYOUT_MAP[display]} />;
};

ContentBlockFeatureConnected.propTypes = {
    id: PropTypes.string,
    content: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        htmlContent: PropTypes.string,
        image: PropTypes.shape({
            sources: PropTypes.arrayOf(PropTypes.shape({
                uri: PropTypes.string,
            })),
        }),
        callsToAction: PropTypes.arrayOf(PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        })),
    }),
    display: PropTypes.oneOf([
        'LEFT',
        'RIGHT',
        'TOP',
        'BOTTOM',
        'BACKGROUND_IMAGE',
    ]),
};

export default ContentBlockFeatureConnected;
