import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';

import { get } from 'lodash';
import { GET_CONTENT_ITEM } from './queries';
import UniversalContentItem from './UniversalContentItem';
import EventContentItem from './EventContentItem';

const ContentSingle = ({ itemId }) => {
    const { loading, error, data } = useQuery(GET_CONTENT_ITEM, {
        variables: {
            itemId,
        },
        fetchPolicy: 'cache-and-network',
    });

    const content = get(data, 'node', {});
    let { __typename } = content;
    if (!__typename && itemId) {
        [__typename] = itemId.split(':');
    }

    switch (__typename) {
        case 'EventContentItem':
            return (
                <EventContentItem
                    itemId={itemId}
                    content={content}
                    loading={loading}
                    error={error}
                />
            );
        case 'DevotionalContentItem':
        case 'WeekendContentItem':
        case 'UniversalContentItem':
        default:
            return (
                <UniversalContentItem
                    itemId={itemId}
                    content={content}
                    loading={loading}
                    error={error}
                />
            );
    }
};

ContentSingle.propType = {
    itemId: PropTypes.string.isRequired,
};

ContentSingle.defaultProps = {

};

export default ContentSingle;
