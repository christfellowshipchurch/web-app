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
} from '../../'

const ContentCardWrapper = ({
    element,
    children,
}) => {
    return React.createElement(
        element,
        {
            className: classnames(
                'col-12',
                'col-md-6',
                'col-lg-4',
                'p-2',
                'mb-2',
            ),
        },
        children
    )
}

const TileRowCard = ({
    title,
    coverImage,
    summary,
    tags,
    icon,
    onClick,
    urlBase,
    label
}) => {
    const style = !!onClick
        ? { cursor: 'pointer' }
        : {}

    return (
        <a
            className={classnames(
                'w-100',
                'p-2',
                'scale-media-up-on-hover',
                'no-decoration',
                'd-flex',
                'flex-row',
                'align-items-center'
            )}
            href={`/${urlBase}/${kebabCase(title)}`}
        >
            <div style={{ flex: 1 }}>
                <Media
                    imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
                    imageUrl={get(coverImage, '[0].uri', '')}
                    ratio='1by1'
                    className={classnames(
                        'rounded',
                        'bg-light',
                    )}
                />
            </div>
            <div
                style={{ flex: 3 }}
                className={classnames(
                    'px-2'
                )}
            >
                <h4>
                    {title}
                </h4>
                <p
                    className="text-secondary"
                    style={{ fontSize: '.8rem' }}
                >
                    {summary}
                </p>
            </div>
        </a>
    )
}

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
    })
}

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
        textColor: 'white'
    }
}

export default TileRowCard