import React from 'react';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';

import Metadata from '../../metadata';
import {
    Media,
} from '../../ui';

import { GET_AUTHOR } from './queries';

const DATE_FORMAT = 'MMMM D, YYYY';

const Author = ({ contentId }) => {
    const { data: { node } = {}, loading, error } = useQuery(GET_AUTHOR, {
        variables: { id: contentId },
        fetchPolicy: 'cache-and-network',
    });
    const authorImageSources = get(node, 'author.photo.uri', '');
    const firstName = get(node, 'author.firstName', '');
    const lastName = get(node, 'author.lastName', '');
    const authorName = `${firstName} ${lastName}`;
    const publishDate = get(node, 'publishDate', '') !== ''
        ? moment(node.publishDate).format(DATE_FORMAT)
        : moment().format(DATE_FORMAT);

    if (error || (!loading && firstName === '' && lastName === '')) return null;

    return (
        <div className="py-4 d-flex align-items-center">
            <Metadata tags={[{ name: 'author', content: authorName }]} />
            {authorImageSources.length > 0
                && (
                    <Media
                        circle
                        ratio="1by1"
                        imageUrl={authorImageSources}
                        imageAlt={authorName}
                        className="author-image mr-3"
                    />
                )}
            <div className="text-left">
                <p className="my-1 font-weight-bold text-dark">
                    {authorName}
                </p>
                <p className="my-1">
                    {`${publishDate}`}
                </p>
            </div>
        </div>
    );
};

Author.propTypes = {
    contentId: PropTypes.string,
};

Author.defaultProps = {

};

export default Author;
