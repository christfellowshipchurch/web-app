import React from 'react'
import PageBuilder from '../../page-builder'

const PageBuilderRouter = ({ match: { params: { page } } }) => {
    return <PageBuilder
        title={page}
        theme="swoop"
    />
}

export default PageBuilderRouter