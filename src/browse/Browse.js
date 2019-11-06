import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useQuery } from 'react-apollo'
import { forEach, get, find, kebabCase } from 'lodash'

import FilterRow from './FilterRow'
import CategoryList from './CategoryList'
import SeeAllCategory from './SeeAllCategory'
import { GET_FILTERS } from './queries'

import {
    Carousel
} from 'react-bootstrap'

const generatePath = (arr) => {
    let path = '/browse'

    forEach(arr, (n) => {
        if (n && n !== '') path = `${path}/${kebabCase(n)}`
        else return false
    })

    return path
}

const Browse = ({
    filter: defaultFilter,
    category: defaultCategory,
    title: defaultTitle
}) => {
    
    const [activeFilterId, setActiveFilterId] = useState(null)
    const [activeCategory, setActiveCategory] = useState(null)
    const [index, setIndex] = useState(0)

    const { loading, error, data } = useQuery(GET_FILTERS,
        {
            fetchPolicy: 'cache-and-network',
            onCompleted: data => {
                const filters = get(data, 'getBrowseFilters[0].childContentItemsConnection.edges', [])
                const firstFilter = get(filters, '[0].node.id', '')
                const filterId = !!defaultFilter
                    ? get(
                        find(filters, n => kebabCase(defaultFilter) === kebabCase(n.node.title)),
                        'node.id', 
                        firstFilter
                    )
                    : firstFilter
                
                setActiveFilterId(filterId)
            }
        } 
     )
    
    const filters = get(data, 'getBrowseFilters[0].childContentItemsConnection.edges', [])
        .map(edge => edge.node)


    useEffect(() => {
        const filters = get(data, 'getBrowseFilters[0].childContentItemsConnection.edges', [])
        const filter = get(
            find(filters, n => activeFilterId === n.node.id),
            'node.title', 
            ''
        )

        const path = generatePath([filter, get(activeCategory, 'title')])

        window.history.pushState(path, 'Browse Christ Fellowship Content', path)
    }, [activeFilterId, activeCategory])

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    return (
        <div className={classnames(
            'container-fluid',
            'max-width-1100',
            'my-6',
            'px-2'
        )}>
            <div className="row">
                <h1 className='mb-3'>
                    Browse
                </h1>
            </div>

            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                controls={false}
                indicators={false}
                interval={null}
                touch={false}
            >
                <Carousel.Item>
                        <div className="">
                            <FilterRow
                                filters={filters}
                                selected={activeFilterId}
                                onChange={({ id }) => setActiveFilterId(id)}
                            />
                        </div>

                        {!!activeFilterId &&
                            <CategoryList 
                                filterId={activeFilterId}
                                onClick={({ id, title }) => {
                                    setActiveCategory({ id, title })
                                    handleSelect(1)
                                }}
                            />}
                </Carousel.Item>
                <Carousel.Item>
                        {!!activeCategory && 
                            <SeeAllCategory
                                categoryId={activeCategory.id}
                                title={activeCategory.title}
                                onBack={() => {
                                    handleSelect(0)
                                }}
                            />}
                </Carousel.Item>
                <Carousel.Item/>
            </Carousel>
        </div>
    )
}

Browse.propTypes = {
    filter: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
}

Browse.defaultProps = {
    filter: null,
    category: null,
    title: null,
}

export default Browse