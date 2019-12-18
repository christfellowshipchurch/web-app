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

    return <Accordion paginate>
        {campusFAQ.map(({ id, title, htmlContent }, i) =>
            <div
                key={`${id}:${i}`}
                title={title}
            >
                {htmlToReactParser.parse(htmlContent)}
            </div>
        )}
    </Accordion>
}

CampusFAQ.propTypes = {
}

CampusFAQ.defaultProps = {

}

export default CampusFAQ