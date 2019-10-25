import React from 'react'
import PropTypes from 'prop-types'

const { Button } = '../../ui'

const Browse = ({
    filter,
    category,
    title
}) => {
    return (
        <div className="container my-6">
            <div className="row">
                <h3>
                    {`Welcome to Browse`}
                </h3>
            </div>

            {filter
                ? <div className="row">
                    <h3>
                        {`Filter: ${filter}`}
                    </h3>
                </div>
                : <div className="row">
                    <Button
                        title="Simulate Filter"
                    />
                </div>
            }

            {category &&
                <div className="row">
                    <h3>
                        {`Category: ${category}`}
                    </h3>
                </div>
            }

            {title &&
                <div className="row">
                    <h3>
                        {`Title: ${title}`}
                    </h3>
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