import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
    get,
    has,
    kebabCase,
} from 'lodash';

import {
    Card,
    Media,
    Loader,
} from '../..';
import { Icon } from '../../Icons';

import { generateUrlLink } from '..';

const HighlightCard = ({
    id,
    title,
    coverImage,
    summary,
    tags,
    icon,
    onClick,
    urlBase,
    label,
    ratio,
    tile,
    isLoading,
    style,
    mediaProps,
    redirectUrl,
    isLive,
}) => (
        <a
            className={classnames(
                'scale-media-up-on-hover',
                'no-decoration',
            )}
            {...generateUrlLink({
                urlBase, title, id, redirectUrl,
            })}
        >
            <Media
                ratio={ratio}
                imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
                imageUrl={get(coverImage, '[0].uri', '')}
                rounded
                withHover
                forceRatio
                style={style}
                className="shadow"
                {...mediaProps}
            >
                <div
                    className={classnames(
                        'w-100',
                        'h-100',
                        'p-3',
                        'd-flex',
                        'flex-row',
                        'align-items-end',
                    )}
                    style={{ zIndex: 2 }}
                >
                    {isLoading
                        ? <Loader />
                        : (
                            <div>
                                {isLive && (
                                    <span className="badge badge-danger text-white" style={{ marginLeft: '-0.4em' }}>
                                        <Icon
                                            name="live-dot"
                                            fill="white"
                                            size="6"
                                            className="mr-1"
                                        />
                LIVE NOW
                                    </span>
                                )}
                                <span className="d-block pt-1" />
                                <span
                                    className={classnames(
                                        'text-white',
                                        {
                                            h5: tile,
                                            'h4-md': tile,
                                            'h3-lg': tile,
                                            h3: !tile,
                                        },
                                    )}
                                >
                                    {title}
                                </span>
                                <p className="text-white">
                                    {summary}
                                </p>
                            </div>
                        )}
                </div>
            </Media>
        </a>
    );

HighlightCard.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    onClick: PropTypes.func,
    as: PropTypes.string,
    icon: PropTypes.string,
    urlBase: PropTypes.string,
    label: PropTypes.shape({
        value: PropTypes.string,
        bg: PropTypes.string,
        textColor: PropTypes.string,
    }),
    ratio: PropTypes.any,
    tile: PropTypes.bool,
    isLoading: PropTypes.bool,
    mediaProps: PropTypes.object,
    isLive: PropTypes.bool,
};

HighlightCard.defaultProps = {
    imageUrl: null,
    title: null,
    onClick: null,
    as: 'div',
    icon: null,
    urlBase: 'content',
    label: {
        value: 'tags[0]',
        bg: 'dark',
        textColor: 'white',
    },
    ratio: '1by1',
    tile: false,
    isLoading: false,
    mediaProps: {
        overlay: 'black',
    },
    isLive: false,
};

export default HighlightCard;
