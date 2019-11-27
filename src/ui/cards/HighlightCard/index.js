import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
    get,
    has,
    kebabCase
} from 'lodash'

import {
    Card,
    Media
} from '../..'

const HighlightCard = ({
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
}) => {
    return (
        <a
            className={classnames(
                'scale-media-up-on-hover',
                'no-decoration',
            )}
            href={`/${urlBase}/${kebabCase(title)}`}
        >
            <Media
                ratio={ratio}
                imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
                imageUrl={get(coverImage, '[0].uri', '')}
                rounded
                withHover
                gradient='black'
            >
                <div
                    className={classnames(
                        'w-100',
                        'h-100',
                        'p-3',
                        'd-flex',
                        'flex-row',
                        'align-items-end'
                    )}
                    style={{ zIndex: 2 }}
                >
                    <div>
                        <span
                            className={classnames(
                                "text-white",
                                {
                                    'h5': tile,
                                    'h4-md': tile,
                                    'h3-lg': tile,
                                    'h3': !tile
                                }
                            )}
                        >
                            {title}
                        </span>
                        <p className="text-white">
                            {summary}
                        </p>
                    </div>
                </div>
            </Media>
        </a>
    )
}

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
}

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
        textColor: 'white'
    },
    ratio: '1by1',
    tile: false,
}

export default HighlightCard