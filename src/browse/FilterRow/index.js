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
            className="list-inline text-nowrap overflow-x-scroll mb-n4"
        >
            {filters.map((n, i) => (
                <li
                    key={i}
                    className="list-inline-item"
                >
                    <a
                        href="#"
                        className={classnames(
                            'h5',
                            'badge',
                            'px-3',
                            'font-weight-normal',
                            {
                                'text-white badge-primary': selected === n.id,
                                'text-dark badge-light': selected !== n.id,
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