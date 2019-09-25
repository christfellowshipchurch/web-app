import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    get,
} from 'lodash'
import { AccordionItem } from './'

// Wrapper component to map the children to the AccordionItem
//  and handle state for which item is currently active
//
// ** The reason this is a separate file from the Accordion is
//      so that the mapping logic can be used here and also in the
//      PaginationWrapper without having to rewrite it **
const AccordionItems = ({
    children,
    offset
}) => {
    return children.length
        ? children.map((n, i) => (
            <AccordionItem
                title={get(n, 'props.title', "Check this out!")}
                key={i}
            >
                {n}
            </AccordionItem>
        ))
        : <AccordionItem
            title={get(children, 'title', "Check this out!")}
        >
            {children}
        </AccordionItem>
}

AccordionItems.propTypes = {
    offset: PropTypes.number
}

AccordionItems.defaultProps = {
    offset: 0
}

export default AccordionItems