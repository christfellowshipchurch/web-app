import React from 'react'
import { useQuery } from 'react-apollo'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Accordion, Loader } from '../ui'
import { htmlToReactParser } from '../utils'

import { GET_CAMPUS_FAQ } from './queries'


const CampusFAQ = ({

}) => {
    const {
        loading,
        error,
        data: {
            campusFAQ = []
        } = {}
    } = useQuery(GET_CAMPUS_FAQ, { fetchPolicy: 'cache-and-network' })

    if (loading) return <Loader />

    return <div>
        <h1 className="my-4 text-center">
            FAQ's
        </h1>

        <Accordion paginate>
            {campusFAQ.map(({ id, title, htmlContent }, i) =>
                <div
                    key={`${id}:${i}`}
                    title={title}
                >
                    {htmlToReactParser.parse(htmlContent)}
                </div>
            )}
        </Accordion>
    </div>
}

CampusFAQ.propTypes = {
}

CampusFAQ.defaultProps = {

}

export default CampusFAQ