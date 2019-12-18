import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Card } from '../'

const PreviewCard = ({
    title,
    summary,
    icon,
    callToAction,
    onClick,
    ...props,
}) => {

    return (
        <Card className="h-100">
            <div className="d-flex flex-column h-100">
                <div style={{ flex: 1 }}>
                    <h4
                        className={classnames(
                            'd-flex',
                            'flex-column',
                            'flex-md-row',
                            'm-0'
                        )}
                    >
                        <span
                            className="text-success mr-2 mb-2"
                            style={{ fontSize: 22 }}
                        >
                            <FontAwesomeIcon
                                icon={['fal', icon]}
                            />
                        </span>
                        <span className="mb-2 mt-1">
                            {title}
                        </span>
                    </h4>
                </div>
                <div
                    className={classnames(
                        'd-none',
                        'd-md-block'
                    )}
                    style={{ flex: 1 }}
                >
                    <p className="text-dark">
                        {summary}
                    </p>
                </div>
                <div
                    className={classnames(
                        "d-flex",
                        'align-items-end',
                        'mt-4'
                    )}
                    style={{ flex: 1 }}
                >
                    <button
                        className={classnames(
                            'btn',
                            'btn-link',
                            'btn-sm',
                            'p-0',
                            'border-0',
                            'text-secondary',
                            'font-weight-normal'
                        )}
                        onClick={onClick}
                    >
                        {callToAction}
                    </button>
                </div>
            </div>
        </Card>
    )
}

PreviewCard.defaultProps = {
    icon: 'hand-point-right',
    callToAction: 'Learn More',
    Component: null,
    onClick: () => true,
}

PreviewCard.propTypes = {
    title: PropTypes.string,
    summary: PropTypes.string,
    icon: PropTypes.string,
    callToAction: PropTypes.string,
    Component: PropTypes.func,
    onClick: PropTypes.func,
}

export default PreviewCard