import React from 'react'

import PageBuilder from '../../page-builder'

const DefaultHome = (props) =>
    <PageBuilder
        title='home'
        theme="swoop"
        backgroundColors={['transparent', 'white', 'primary']}
        {...props}
    />

DefaultHome.propTypes = {
}

DefaultHome.defaultProps = {
}

export default DefaultHome