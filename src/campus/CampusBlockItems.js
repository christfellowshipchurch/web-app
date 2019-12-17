import React from 'react'
import { useQuery } from 'react-apollo'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { head } from 'lodash'

import { Block, Loader } from '../ui'
import { htmlToReactParser } from '../utils'

import { GET_CAMPUS_BLOCKS } from './queries'


const CampusBlockItems = ({
    campus,
}) => {
    const {
        loading,
        error,
        data: {
            campusContentItems = []
        } = {}
    } = useQuery(GET_CAMPUS_BLOCKS, {
        fetchPolicy: 'cache-and-network',
        variables: { name: campus }
    })

    if (loading) return <Loader />

    const item = head(campusContentItems)

    console.log({ campusContentItems })

    return <Block
        contentLayout='left'
        {...item}
    />
}

CampusBlockItems.propTypes = {
    campus: PropTypes.string,
}

CampusBlockItems.defaultProps = {
    campus: '',
}

export default CampusBlockItems