import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import {
    findIndex,
    get,
    forEach,
    kebabCase,
    toUpper
} from 'lodash'

import {
    Button,
    Loader,
    ContentContainer
} from '../ui'
import {mapEdgesToNodes} from '../utils'
import {GET_BROWSE_FILTERS} from './queries'
import BrowseCategories from './BrowseCategories'

const generatePath = (arr) => {
    let path = '/browse'

    forEach(arr, (n) => {
        if (n && n !== '') path = `${path}/${kebabCase(n)}`
        else return false
    })

    return path
}

const BrowseFilters = ({
    selected,
    onChange,
    filters
}) => {

    return (
        <ul 
        className="list-inline text-nowrap overflow-x-scroll"
        >
            {filters.map((n, i) => (
                <li 
                    key={i}
                    className="list-inline-item"
                >
                    <a
                        href="#"
                        className={classnames(
                            'h4',
                            'my-2',
                            'mr-4',
                            {
                                'font-weight-bold': selected === n.id,
                                'font-weight-normal': selected !== n.id,
                            }
                        )}
                        
                        onClick= {
                            () => onChange({ id: n.id })
                        }
                        >
                        {n.title}
                    </a>
                </li>
            ))}
        </ul> 
        )
}

BrowseFilters.propTypes = {
    selected: PropTypes.number,
    onChange: PropTypes.func,
    filters: PropTypes.array
}

BrowseFilters.defaultProps = {
    filter: null,
    title: null,
}

export default BrowseFilters