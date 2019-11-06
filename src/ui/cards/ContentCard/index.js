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
    onClick
}) => (
    <div
        className={classnames(
            'col-12',
            'col-md-6',
            'col-lg-4',
            'p-2',
            'mb-5',
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
                    imageAlt={title}
                    imageUrl={get(coverImage, '[0].uri', '')}
                    ratio='16by9'
                    className='rounded-top bg-light'
                />
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
                       style={{fontSize:'.8rem', color: 'grey'}} 
                    >
                        {summary}
                    </p>
                </div>
            </Card>
        </a>       
    </div>
)

ContentCard.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    onClick: PropTypes.func
}

ContentCard.defaultProps = {
    imageUrl: null,
    title: null,
    onClick: () => true
}

export default ContentCard