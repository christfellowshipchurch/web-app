import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
    get
} from 'lodash'
import {
    Accordion,
    Button
} from 'react-bootstrap'

const TabIcon = ({
    icon,
    title,
    onClick,
    isActive,
    eventKey
}) => (
        <li style={{ fontSize: 12, width: 114 }}>
            <Accordion.Toggle
                onClick={onClick}
                eventKey={eventKey}
                className={classnames(
                    { 'btn-outline-dark': !isActive },
                    { 'btn-outline-primary': isActive },
                    'bg-transparent',

                    'no-decoration',
                    'font-weight-bold',

                    'mx-auto',
                    'py-1',

                    'd-flex',
                    'flex-column',
                    'justify-content-center',
                    'align-items-center',

                    'border-0',
                    'focus-indicator-none',
                )}
            >
                <i className={`fal fa-${icon} fa-3x`}></i>
                <span className="mt-1">
                    {title}
                </span>
            </Accordion.Toggle>
        </li>
    )

TabIcon.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    isActive: PropTypes.bool
}

TabIcon.defaultProps = {
    icon: 'info-circle',
    onClick: () => true,
    isActive: false
}

const Tabs = ({
    children,
    className
}) => {
    const [activeEventKey, setActiveEventKey] = useState("0")

    return (
        <Accordion
            className={classnames(
                'container-fluid',
                className
            )}
            defaultActiveKey="0"
        >
            <div
                className={classnames(
                    "row",
                    "justify-content-center",
                    'overflow-x-auto'
                )}
            >
                <div
                    className={classnames(
                        'col-12',
                        'col-md-6',
                        'overflow-x-hidden'
                    )}
                >
                    <ul
                        className={classnames(
                            'nav',
                            'justify-content-center',
                            'flex-nowrap'
                        )}
                    >
                        {children.length
                            ? (
                                children.map((n, i) =>
                                    <TabIcon
                                        key={i}
                                        icon={get(n, 'props.icon', 'info-circle')}
                                        title={get(n, 'props.title', '')}
                                        eventKey={i.toString()}
                                        isActive={activeEventKey === i.toString()}
                                        onClick={() => setActiveEventKey(i.toString())}
                                    />
                                )
                            )
                            : <TabIcon
                                icon={get(children, 'props.icon', 'info-circle')}
                                title={get(children, 'props.title', '')}
                                eventKey="0"
                                isActive
                            />
                        }
                    </ul>
                </div>
            </div>

            {children.length
                ? children.map((n, i) => (
                    <Accordion.Collapse
                        eventKey={i.toString()}
                        key={i}
                    >
                        <div className="row">
                            <div className="col-12">
                                {n}
                            </div>
                        </div>
                    </Accordion.Collapse>
                ))
                : <div className="row">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            }

        </Accordion >
    )
}

Tabs.propTypes = {
    className: PropTypes.string
}

Tabs.defaultProps = {
    className: ''
}

export default Tabs
export { default as TabContent } from './TabContent'