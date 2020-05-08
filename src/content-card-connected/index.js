import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';
import moment from 'moment';

import { ContentCard } from '../ui';
import GET_CONTENT_CARD from './queries';

import { LiveConsumer } from '../live/LiveContext';

const ContentCardConnectedWithQuery = ({
    contentId,
    tile,
    card,
    label,
    isLive,
    hideLabel,
    ...otherProps
}) => {
    const { loading, error, data } = useQuery(GET_CONTENT_CARD,
        { variables: { contentId, tile: false }, fetchPolicy: 'cache-and-network' });

    if (error) return null;

    const node = get(data, 'node', {});
    const typename = get(node, '__typename', '');
    const metrics = [
        {
            icon: node.isLiked ? 'like-solid' : 'like',
            value: node.likedCount,
        },
    ];
    const coverImage = get(node, 'coverImage.sources', undefined);
    let labelValue = typeof label.field === 'string'
        ? get(node, label.field, '')
        : label.field(node);

    if (typename === 'EventContentItem') {
        const hideLabel = get(node, 'hideLabel', false);
        const comingSoon = hideLabel ? '' : 'Dates Coming Soon';

        labelValue = get(node, 'events', []).length
            ? moment(get(node, 'nextOccurrence', new Date())).format('MMM D')
            : comingSoon;
    }

    if (isLive) {
        labelValue = 'live now';
        label.bg = 'danger';
        label.textColor = 'white';
    }

    if (hideLabel) {
        labelValue = '';
    }

    let urlBase = 'content';
    switch (typename) {
        case 'EventContentItem':
            urlBase = 'events';
            break;
        case 'InformationalContentItem':
            urlBase = 'items';
            break;
        default:
            break;
    }

    urlBase = get(otherProps, 'baseUrl', urlBase);

    return React.createElement(
        card,
        {
            ...node,
            ...otherProps,
            coverImage,
            metrics,
            tile,
            isLoading: loading,
            label: {
                value: labelValue,
                ...label,
            },
            urlBase,
        },
    );
};

const ContentCardConnected = ({
    contentId,
    isLoading,
    tile,
    card = ContentCard,
    ...otherProps
}) => {
    if (!contentId || isLoading) {
        return React.createElement(
            card,
            {
                ...otherProps,
                tile,
                isLoading: true,
            },
        );
    }

    return (
        <LiveConsumer contentId={contentId}>
            {(liveStream) => {
                const isLive = !!(liveStream && liveStream.isLive);

                return (
                    <ContentCardConnectedWithQuery
                        contentId={contentId}
                        tile={tile}
                        card={card}
                        isLive={isLive}
                        {...otherProps}
                    />
                );
            }}
        </LiveConsumer>
    );
};

ContentCardConnected.propTypes = {
    isLoading: PropTypes.bool,
    contentId: PropTypes.string,
    tile: PropTypes.bool,
    card: PropTypes.func,
    hideLabel: PropTypes.bool,
    label: PropTypes.shape({
        field: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        bg: PropTypes.string,
        textColor: PropTypes.string,
    }),
};

ContentCardConnected.defaultProps = {
    card: ContentCard,
    tile: false,
    hideLabel: false,
    label: {
        field: 'tags[0]',
        bg: 'dark',
        textColor: 'white',
    },
};

export default ContentCardConnected;
