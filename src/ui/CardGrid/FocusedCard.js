import React, { useEffect, useState, useRef } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Card } from '../'
import { htmlToReactParser } from '../../utils'
import { Icon } from '../Icons'

const Title = ({ children }) =>
    <h4 className="mb-4">{children}</h4>

const FocusedCard = ({
    title,
    summary,
    icon,
    callToAction,
    onCancel,
    htmlContent,
    options,
    onResize, // calls this function when this card changes size
    ...props
}) => {
    const ref = useRef(null)

    useEffect(() => {
        onResize(ref.current.clientHeight)
    })

    return (
        <div ref={ref}>
            <Card
                className="w-100 container m-2"
                style={{ zIndex: 1000 }}
            >
                <div 
                    className='d-flex justify-content-between'
                >
                    <h4>
                        <span
                            className="text-success mr-2"
                            style={{ fontSize: 22 }}
                        >
                            {React.createElement(icon)}
                        </span>
                        {title}
                    </h4>

                    <button
                        onClick={onCancel}
                        className={classnames(
                            'bg-light',
                            'border-0',
                            'rounded-circle',
                        )}
                        style={{
                            height: 32,
                            width: 32,
                            zIndex: 100 // ui hack so the button is always accessible
                        }}
                    >
                        <Icon
                            className='d-flex'
                            name='times'
                            fill='white'
                        />
                    </button>
                </div>

                <div className="row mt-4">
                    <div
                        className={classnames(
                            'col-12',
                            'col-md-7',
                            'pr-md-2',
                        )}
                    >
                        <Title>
                            {summary}
                        </Title>
                        {htmlToReactParser.parse(htmlContent)}
                    </div>
                    <div
                        className={classnames(
                            'col',
                            'pl-md-2',
                        )}
                    >
                        <Title>
                            {'Includes these options:'}
                        </Title>
                        <ul className="pl-4">
                            {options.map((n, i) => <li key={`FocusedCardOptions:${title}:${i}`}>{n}</li>)}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    )
}

FocusedCard.defaultProps = {
    onCancel: () => true,
    onResize: () => true
}

FocusedCard.propTypes = {
    title: PropTypes.string,
    summary: PropTypes.string,
    icon: PropTypes.string,
    callToAction: PropTypes.string,
    htmlContent: PropTypes.string,
    onCancel: PropTypes.func,
    onResize: PropTypes.func,
}

export default FocusedCard