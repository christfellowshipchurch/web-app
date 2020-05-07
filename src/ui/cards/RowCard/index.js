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
} from '../..';

import { generateUrlLink } from '..';

const TileRowCard = ({
    id,
    title,
    coverImage,
    summary,
    tags,
    icon,
    onClick,
    urlBase,
    label,
    redirectUrl,
}) => {
    const style = onClick
        ? { cursor: 'pointer' }
        : {};

    return (
        <a
            className={classnames(
                'w-100',
                'p-2',
                'scale-media-up-on-hover',
                'no-decoration',
            )}
            {...generateUrlLink({
                urlBase, title, id, redirectUrl,
            })}
        >
            <div className={classnames(
                'p-0',
                'd-flex',
                'flex-row',
                'align-items-center',
                'bg-white',
                'rounded',
                'shadow',
            )}
            >
                <div style={{
                    flex: 1,
                }}
                >
                    <Media
                        imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
                        imageUrl={get(coverImage, '[0].uri', '')}
                        ratio="1by1"
                        className={classnames(
                            'bg-light',
                            'rounded',
                        )}
                    />
                </div>
                <div
                    style={{ flex: 3 }}
                    className={classnames(
                        'px-2',
                    )}
                >
                    {label.value !== ''
                        && (
                            <h6
                                className="text-secondary"
                            >
                                {label.value}
                            </h6>
                        )}
                    <h4 className="mb-0">
                        {title}
                    </h4>
                    <p
                        className="text-secondary mb-0"
                        style={{ fontSize: '.8rem' }}
                    >
                        {summary}
                    </p>
                </div>
            </div>
        </a>
    );
};

TileRowCard.propTypes = {
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
};

TileRowCard.defaultProps = {
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
};

export default TileRowCard;
