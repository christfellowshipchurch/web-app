import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { useSandbox } from '../../sandbox';
import ContentCardConnected from '../../content-card-connected';
import { ContentCard, HighlightCard, ContentContainer } from '../../ui';

import { GET_CONTENT_FEED } from '../../content-feed';
import { CARD_PADDING, MARGIN_Y, PADDING_X } from '.';

const RATIO_MAP = {
    '-1': '4by3',
    0: { xs: '1by1', lg: '16by9' },
    1: '21by9',
};

const cardLoadingObject = {
    id: 'fake_id',
    title: '',
    coverImage: [],
    ratio: RATIO_MAP[0],

};

const StyledHighlightCard = ({ style, ...props }) => <HighlightCard {...props} style={{ maxHeight: 450, ...style }} />;
const SecondaryHighlightCard = (props) => (
    <div className={classnames(
        'col-12',
        'col-lg-4',
        'p-2',
    )}
    >
        <HighlightCard {...props} ratio="1by1" />
    </div>
);

const AnnouncementFeed = ({
    itemId,
}) => {
    const { sandbox } = useSandbox();
    const {
        loading,
        error,
        data,
    } = useQuery(GET_CONTENT_FEED, {
        fetchPolicy: 'cache-and-network',
        variables: {
            itemId,
            child: true,
            sibling: false,
        },
    });

    if (loading) {
        return (
            <ContentContainer className="max-width-800">
                <StyledHighlightCard isLoading {...cardLoadingObject} />
            </ContentContainer>
        );
    }

    const content = get(data, 'node.childContentItemsConnection.edges', []);

    return (
        <div
            className={classnames(
                'container-fluid',
            )}
        >
            <div className="row mx-n2">
                {content.map(({ node }, i) => {
                    const placement = i === 0
                        ? 0
                        : i === content.length - 1 ? 1 : -1;

                    return (
                        i === 0
                            ? (
                                <div
                                    key={`AnnouncementFeed:${i}`}
                                    className={classnames(
                                        'p-2',
                                        'col-12',
                                    )}
                                >
                                    <ContentCardConnected
                                        contentId={node.id}
                                        card={StyledHighlightCard}
                                        ratio={RATIO_MAP[placement]}
                                        mediaProps={{
                                            gradient: 'dark',
                                            gradientDirection: 'bottom-top',
                                        }}
                                    />
                                </div>
                            )

                            : (
                                <ContentCardConnected
                                    key={`AnnouncementFeed:${i}`}
                                    contentId={node.id}
                                    card={sandbox.homeTheme === 'highlight' ? SecondaryHighlightCard : ContentCard}
                                    ratio={RATIO_MAP[placement]}
                                    mediaProps={{
                                        gradient: 'dark',
                                        gradientDirection: 'bottom-top',
                                    }}
                                />
                            )
                    );
                })}
            </div>
        </div>
    );
};

export default AnnouncementFeed;
