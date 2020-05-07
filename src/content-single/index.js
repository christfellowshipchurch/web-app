import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get, uniqBy } from 'lodash';

import Metadata from '../metadata';
import { GET_CONTENT_ITEM } from './queries';
import UniversalContentItem from './UniversalContentItem';
import EventContentItem from './EventContentItem';
import InformationalContentItem from './InformationalContentItem';


const ContentSingle = ({ itemId }) => {
    const { loading, error, data } = useQuery(GET_CONTENT_ITEM, {
        variables: {
            itemId,
        },
        fetchPolicy: 'cache-and-network',
    });

    const content = get(data, 'node', {});
    const metadata = get(data, 'metadata', []);
    let { __typename } = content;
    if (!__typename && itemId) {
        [__typename] = itemId.split(':');
    }

    const renderContentSingle = (typename) => {
        switch (typename) {
            case 'EventContentItem':
                return (
                    <EventContentItem
                        itemId={itemId}
                        content={content}
                        loading={loading}
                        error={error}
                    />
                );
            case 'InformationalContentItem':
                return (
                    <InformationalContentItem
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

    return (
        <>
            <Metadata
                tags={uniqBy([
                    ...metadata,
                    { name: 'title', content: get(content, 'title') },
                    { name: 'description', content: get(content, 'summary') },
                    { name: 'image', content: get(content, 'coverImage.sources[0].uri') },
                    { name: 'og:video', content: get(content, 'videos[0].sources[0].uri') },
                ], 'name')}
            />
            {renderContentSingle(__typename)}
        </>
    );
};

ContentSingle.propType = {
    itemId: PropTypes.string.isRequired,
};

ContentSingle.defaultProps = {

};

export default ContentSingle;
