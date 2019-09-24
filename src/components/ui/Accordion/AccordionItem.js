import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
    Accordion as BootstrapAccordion,
    Card,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from "@fortawesome/pro-light-svg-icons"

// Styling and layout for the physical accordion item
//  that the user interacts with
const AccordionItem = ({
    children,
    eventKey,
    title,
    onClick,
    isActive
}) => {
    const fontAwesomeProps = {}
    if (isActive) fontAwesomeProps.rotation = 180

    return (
        <div
            className={classnames(
                'col-12',
                'col-md-6',
                'py-1',
                'px-3',
            )}
        >
            <div
                className={classnames(
                    'bg-white',
                    'rounded',
                    'shadow-sm'
                )}
            >
                <BootstrapAccordion.Toggle
                    variant="link"
                    eventKey={eventKey}
                    onClick={onClick}
                    className={classnames(
                        "p-3",
                        "w-100",
                        "text-left",
                        "bg-transparent",
                        "border-light",
                        "rounded",
                        "focus-indicator-none"
                    )}
                >
                    <div
                        className={classnames(
                            "d-flex",
                            "flex-row",
                            "justify-content-between",
                            "align-items-center"
                        )}
                    >
                        <span>{title}</span>
                        <span>
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                size="2x"
                                {...fontAwesomeProps}
                            />
                        </span>
                    </div>
                </BootstrapAccordion.Toggle>
                <BootstrapAccordion.Collapse eventKey={eventKey}>
                    <Card.Body>{children}</Card.Body>
                </BootstrapAccordion.Collapse>
            </div>
        </div>
    )
}

AccordionItem.defaultProps = {
    paginate: false,
    threshold: 2
}

AccordionItem.propTypes = {
    paginate: PropTypes.bool,
    threshold: PropTypes.number
}

export default AccordionItem