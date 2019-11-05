import React, { useState, Children } from 'react'
import { useQuery } from 'react-apollo'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
    get
} from 'lodash'

import {
    Button,
    Card,
    Loader,
    ContentContainer,
    Media
} from '../ui'
import { mapEdgesToNodes } from '../utils'
import { GET_CATEGORIES_FROM_FILTER } from './queries'
import ContentCard from './ContentCard'


const BrowseCategories = ({
    filterId,
    onChange,
}) => {

    const [index, setIndex] = useState(0)
    const [categoryId, setCategoryId] = useState('')

    const { loading, error, data } = useQuery(GET_CATEGORIES_FROM_FILTER, {
        variables: { filterId }
    })

    if (loading) return (
        <ContentContainer>
            <Loader />
        </ContentContainer>
    )

    if (error) {
        console.log({ error })
        return null
    }

    const categories = mapEdgesToNodes(get(data, 'node.childContentItemsConnection', null))

    return (
        <div className="container my-6">
            {categories.map((category, i) => {
                const content = mapEdgesToNodes(get(category, 'childContentItemsConnection', null))

                return [
                    <div
                        key={i}
                        className="row mt-6"
                    >
                        <div className="col-9">
                            <h3>
                                {category.title}
                            </h3>
                        </div>
                        {content.length > 3 &&
                            <div className="col-3 text-right">
                                <a
                                    href="#"
                                    className="h5"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onChange({ id: category.id, title: category.title })
                                    }}
                                >
                                    See More
                                </a>
                            </div>}

                    </div>,
                    <div className="row px-n2">
                        {content.slice(0, 3).map((n, i) => (
                            <ContentCard
                                key={i}
                                imageUrl={get(n, 'images[0].sources[0].uri', '')}
                                title={get(n, 'title', 'Title')}
                                summary={get(n, 'summary', '')}
                            />
                        ))}
                    </div>
                ]
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