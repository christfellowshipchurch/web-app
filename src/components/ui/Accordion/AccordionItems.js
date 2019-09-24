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
    const [activeIndex, setActiveIndex] = useState('-1')

    return children.length
        ? children.map((n, i) => {
            const index = i + offset
            const eventKey = index.toString()
            const eventKeyIsActiveKey = activeIndex === eventKey
            const accordionItemProps = {
                title: get(n, 'props.title', "Check this out!"),
                onClick: () => setActiveIndex(eventKeyIsActiveKey ? '-1' : eventKey),
                eventKey,
                isActive: eventKeyIsActiveKey
            }

            return (
                <AccordionItem {...accordionItemProps} key={i}>
                    {n}
                </AccordionItem>
            )
        })
        : <AccordionItem
            title={get(children, 'title', "Check this out!")}
            eventKey={"1"}
            isActive={activeIndex === '1'}
            onClick={() => setActiveIndex(activeIndex === '1' ? '-1' : "1")}
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