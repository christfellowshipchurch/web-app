import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
    get
} from 'lodash'

import {
    Card,
    Media
} from '../../'


const ContentCard = ({
    title,
    coverImage,
    summary,
    tags,
    icon,
    onClick
}) => {
    const tag = get(tags, '[0]', '')
    return (
        <div
            className={classnames(
                'col-12',
                'col-md-6',
                'col-lg-4',
                'p-2',
                'mb-2',
                'scale-up-on-hover'
            )}
        >
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    onClick()
                }}
            >
                <Card
                    fill
                    className='h-100'
                >
                    <Media
                        imageAlt={get(coverImage, '[0].name', 'Christ Fellowship Church')}
                        imageUrl={get(coverImage, '[0].uri', '')}
                        ratio='16by9'
                        className='rounded-top bg-light'
                    >
                        {tag !== '' &&
                            <h5
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    letterSpacing: 1.75
                                }}
                                className={classnames(
                                    'p-3',
                                    'bg-dark',
                                    'text-uppercase',
                                    'text-white',
                                    'mb-n1'
                                )}
                            >
                                {tag}
                            </h5>
                        }
                    </Media>
                    <div
                        className='m-4'
                    >
                        <h4
                            className='mb-1'
                        >
                            {title}
                        </h4>
                        <p
                            className='font-weight-light'
                            style={{ fontSize: '.8rem', color: 'grey' }}
                        >
                            {summary}
                        </p>
                    </div>
                </Card>
            </a>
        </div>
    )
}

ContentCard.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    onClick: PropTypes.func,
    tags: PropTypes.arrayOf(
        PropTypes.string
    )
}

ContentCard.defaultProps = {
    imageUrl: null,
    title: null,
    onClick: () => true,
    tags: []
}

export default ContentCard