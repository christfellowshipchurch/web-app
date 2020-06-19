import React from 'react'
import PropTypes from 'prop-types'
import { AngleLeft } from '../ui/Icons'

import { CardFeed } from '../content-feed'

const SeeAllCategory = ({
    categoryId,
    title,
    onBack
}) => {

    window.scrollTo(0, 0)

    return (
        <div 
            className="container-fluid"
            style={{minHeight:'100%'}}
        >
            <div className='row align-content-center mt-3 mb-n6'>
                <a
                    href='/#'
                    onClick={(e) => {
                        e.preventDefault()
                        onBack()
                    }}
                    className='h3 d-flex align-items-center'
                >
                    <AngleLeft
                        size='24'
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