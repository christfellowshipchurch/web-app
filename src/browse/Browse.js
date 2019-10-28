import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { forEach } from 'lodash'

import { Button } from '../ui'

import BrowseFilters from './BrowseFilters'

const generatePath = (arr) => {
    let path = '/browse'

    forEach(arr, (n) => {
        if (n && n !== '') path = `${path}/${n}`
        else return false
    })

    return path
}

const Browse = ({
    filter: defaultFilter,
    category: defaultCategory,
    title: defaultTitle
}) => {
    const [filter, setFilter] = useState(defaultFilter)
    const [category, setCategory] = useState(defaultCategory)
    const [title, setTitle] = useState(defaultTitle)

    useEffect(() => {
        const path = generatePath([filter, category, title])

        window.history.pushState(path, 'Browse Christ Fellowship Content', path)
    }, [filter, category, title])

    return (
        <div className="container my-6">
            <div className="row">
                <h3>
                    {`Welcome to Browse`}
                </h3>
            </div>

            <BrowseFilters/>


            {filter
                ? <div className="row">
                    <h3>
                        {`Filter: ${filter}`}
                    </h3>
                </div>
                : <div className="row">
                    <Button
                        title="Simulate Filter"
                        onClick={() => setFilter('filter')}
                    />
                </div>
            }

            {category
                ? <div className="row">
                    <h3>
                        {`Category: ${category}`}
                    </h3>
                </div>
                : <div className="row">
                    <Button
                        title="Simulate Category"
                        onClick={() => setCategory('category')}
                    />
                </div>
            }

            {title
                ? <div className="row">
                    <h3>
                        {`Title: ${title}`}
                    </h3>
                </div>
                : <div className="row">
                    <Button
                        title="Simulate Title"
                        onClick={() => setTitle('title')}
                    />
                </div>
            }
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