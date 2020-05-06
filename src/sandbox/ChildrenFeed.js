import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { get, kebabCase } from 'lodash';
import classnames from 'classnames';

import { useSandbox } from '.';
import {
    ContentContainer,
    Loader,
    ContentCard,
    HighlightCard,
} from '../ui';
import ContentCardConnected from '../content-card-connected';
import { GET_CONTENT_FEED } from '../content-feed';

const ColumnHighlightCard = ({ style, ...props }) => (
    <div className={classnames('col-12',
        'col-md-6',
        'col-lg-4',
        'px-2',
        'pt-2')}
    >
        <HighlightCard {...props} style={{ ...style, height: '100%' }} ratio="1by1" />
    </div>
);

const THEME_CARD_MAP = {
    default: ContentCard,
    highlight: ColumnHighlightCard,
};

export const ChildrenFeedSandbox = ({
    id,
    urlBase,
    first,
}) => {
    const { sandbox } = useSandbox();
    const { loading, error, data } = useQuery(GET_CONTENT_FEED, {
        variables: {
            itemId: id,
            first,
            child: true,
            sibling: false,
        },
    });

    if (loading) {
        return (
            <ContentContainer>
                <Loader />
            </ContentContainer>
        );
    }

    if (error) {
        console.log({ error });
        return null;
    }

    const content = get(data, 'node.childContentItemsConnection.edges', []).map(
        (edge) => edge.node,
    );
    const title = get(data, 'node.title', '');

    console.log({ sandbox });

    return (
        <div
            className={classnames(
                'container-fluid',
            )}
        >
            <div className="row">
                <div className="col">
                    <h3 className="text-dark align-self-start">
                        {title}
                    </h3>
                </div>
                {!!urlBase && urlBase !== '' && title !== 'Most Recent'
                    && (
                        <div className="col text-right">
                            <a
                                href={`${urlBase}/${kebabCase(title)}`}
                                className="text-dark align-self-end"
                            >
                                See All
                      </a>
                        </div>
                    )}
            </div>
            <div className="row mx-n1 my-n3">
                {content.map((n, i) => (
                    <ContentCardConnected
                        key={i}
                        contentId={n.id}
                        urlBase={urlBase}
                        card={get(THEME_CARD_MAP, sandbox.homeTheme, ContentCard)}
                    />
                ))}
            </div>
        </div>
    );
};

ChildrenFeedSandbox.propTypes = {
    id: PropTypes.string,
    urlBase: PropTypes.string,
    first: PropTypes.number,
};

ChildrenFeedSandbox.defaultProps = {
    id: null,
    urlBase: '/content/categories',
    first: 3,
};
