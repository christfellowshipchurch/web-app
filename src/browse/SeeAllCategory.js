import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo'
import { get } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/fontawesome-pro-regular'

import {
    ContentContainer,
    Loader,
    Button,
    Card,
    Media
} from '../ui'
import { mapEdgesToNodes } from '../utils'
import {GET_ALL_CONTENT_FROM_CATEGORY} from './queries'
import ContentCard from './ContentCard'

const SeeAllCategory = ({
    categoryId,
    onBack
}) => {
    const [index, setIndex] = useState(1)

    const { loading, error, data } = useQuery(GET_ALL_CONTENT_FROM_CATEGORY,{
        variables: {categoryId}
    })
    
    if (loading) return (
        <ContentContainer>
            <Loader/>
        </ContentContainer>
    )

    if (error) {
    console.log({ error })
    return null
    }

    const category = get(data, 'node.title', null)
    const content = mapEdgesToNodes(get(data, 'node.childContentItemsConnection', null))
    return (
        <div 
            className="container my-6"
            style={{minHeight:'100%'}}
        >
            <div className='row align-content-center'>
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
                    {category}
                </a>
                
            </div>     
            
            <div className='row'>
                {content.map((n, i) => (
                    <ContentCard
                        key={i}
                        title={n.title}
                        imageUrl={get(n, 'images[0].sources[0].uri', '')}
                        summary={get(n, 'summary', '')}
                    />
                ))}
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