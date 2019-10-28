import React, { useState, Children } from 'react'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import {
    toLower,
    get
} from 'lodash'

import {
    Button,
    Loader,
    ContentContainer
} from '../ui'
import {mapEdgesToNodes} from '../utils'
import {GET_CATEGORIES_FROM_FILTER} from './queries'


const BrowseCategories = ({ filterId }) => {

    const { loading, error, data } = useQuery(GET_CATEGORIES_FROM_FILTER,{
        variables: {filterId}
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

    console.log({data})

    const categories = mapEdgesToNodes(get(data, 'node.childContentItemsConnection', null))

    console.log({categories})

    return (
        <div className="container my-6">
            {categories.map((category, i) => {
            
            const content = mapEdgesToNodes(category.childContentItemsConnection)

                return (
                    <div
                        key={i}
                        className="row flex-column"
                    >
                        <h3>
                            {category.title}
                        </h3>
                        <div className='col'>
                            {content.map((n, i) => {
                                return(
                                    <p key={i}>
                                        {n.title}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

BrowseCategories.propTypes = {
    filter: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
}

BrowseCategories.defaultProps = {
    filter: null,
    category: null,
    title: null,
}

export default BrowseCategories