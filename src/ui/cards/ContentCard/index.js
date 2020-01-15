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

const ContentCard = ({
    title,
    coverImage,
    summary,
    tags,
    icon,
    onClick,
    urlBase,
    label,
    row
}) => {
    const style = !!onClick
        ? { cursor: 'pointer' }
        : {}

    return (
        <a
            className={classnames(
                'col-12',
                'col-md-6',
                'col-lg-4',
                'px-2',
                'pt-2',
                'mb-5',
                'scale-media-up-on-hover',
                'no-decoration',
            )}
            href={`/${urlBase}/${kebabCase(title)}`}
        >
            <Card
                fill
                className={classnames(
                    {
                        'h-100': !row
                    },
                    'overflow-hidden',
                )}
                style={style}
            >
                <div
                    className={classnames({
                        'flex-column': !!row,
                        'flex-md-row': !!row,
                        'd-flex': row,
                        'align-items-md-center': row
                    })}
                >
                    <Media
                        imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
                        imageUrl={get(coverImage, '[0].uri', '')}
                        ratio='16by9'
                        className={classnames(
                            'rounded-top',
                            'bg-light',
                        )}
                        style={{ ...(row && { flex: 1 }) }}
                        forceRatio
                    >
                        {label.value !== '' &&
                            <h6
                                style={{
                                    position: 'absolute',
                                    bottom: -10,
                                    left: 0,
                                    letterSpacing: 4
                                }}
                                className={classnames(
                                    'px-3',
                                    'py-2',
                                    [`bg-${label.bg}`],
                                    [`text-${label.textColor}`],
                                    'text-uppercase',
                                )}
                            >
                                <small className='font-weight-bold'>
                                    {label.value}
                                </small>
                            </h6>
                        }
                    </Media>
                    <div
                        className='mt-3 mx-3 row'
                        style={{ ...(row && { flex: 2 }) }}
                    >
                        <div className="col pr-1">
                            <h4
                                className='mb-1'
                            >
                                {title}
                            </h4>
                            <p
                                className="text-secondary"
                                style={{ fontSize: '.8rem' }}
                            >
                                {summary}
                            </p>
                        </div>
                        {!!icon && icon !== '' &&
                            <div className="col-1 text-right text-secondary">
                                <span className="h4">
                                    <i className={`fal fa-${icon}`}></i>
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </Card>
        </a>
    )
}

ContentCard.propTypes = {
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
    row: PropTypes.bool
}

ContentCard.defaultProps = {
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
    row: false
}

export default ContentCard