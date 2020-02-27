import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/fontawesome-pro-regular'

import { CardFeed } from '../content-feed'

const SeeAllCategory = ({
    categoryId,
    title,
    onBack
}) => {
    return (
        <div 
            className="container-fluid"
            style={{minHeight:'100%'}}
        >
            <div className='row align-content-center mt-3 mb-n6'>
                <a
                    href='#'
                    onClick={(e) => {
                        e.preventDefault()
                        onBack()
                    }}
                    className='h3'
                >
                    <FontAwesomeIcon 
                        icon={faAngleLeft} 
                        color='black'
                        className='mr-2'
                    />
                    {title}
                </a>
            </div>
            <div className="row px-n2">
                <CardFeed id={categoryId} />
            </div>
        </div>
    )
}

SeeAllCategory.propTypes = {
    filter: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    onBack: PropTypes.func
}

SeeAllCategory.defaultProps = {
    filter: null,
    category: null,
    title: null,
    onBack: () => true
}

export default SeeAllCategory