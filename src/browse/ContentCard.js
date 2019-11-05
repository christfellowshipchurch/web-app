import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
    kebabCase
} from 'lodash'

import {
    Card,
    Media
} from '../ui'
import { redirectTo } from '../utils'


const ContentCard = ({title, imageUrl, summary}) => (
    <div
        className={classnames(
            'col-12',
            'col-md-6',
            'col-lg-4',
            'p-2',
            'scale-up-on-hover'
       )}
       style={{cursor: 'pointer'}}
       onClick={() => redirectTo(`/articles/${kebabCase(title)}`)}
    >   
        <a>
            <Card
                fill
                className='h-100'
            >
                <Media
                    imageAlt='thumbnail'
                    imageUrl={imageUrl}
                    ratio='16by9'
                    className='rounded-top bg-light'
                />
                <div
                    className='m-3'
                >
                    <h4
                        className='mb-1'
                    >
                        {title}
                    </h4>
                    <p
                       className='font-weight-light'
                       style={{fontSize:'.8rem'}} 
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
}

ContentCard.defaultProps = {
    imageUrl: null,
    title: null,
}

export default ContentCard