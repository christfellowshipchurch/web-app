import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

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
                            'mr-3',
                            {
                                'font-weight-bold': selected === n.id,
                                'font-weight-normal': selected !== n.id,
                            }
                        )}

                        onClick={(e) => {
                            e.preventDefault()
                            onChange({ id: n.id })
                        }}
                    >
                        {n.title}
                    </a>
                </li>
            ))}
        </ul>
    )
}

BrowseFilters.propTypes = {
    selected: PropTypes.string,
    onChange: PropTypes.func,
    filters: PropTypes.array
}

BrowseFilters.defaultProps = {
    filter: null,
    title: null,
}

export default BrowseFilters