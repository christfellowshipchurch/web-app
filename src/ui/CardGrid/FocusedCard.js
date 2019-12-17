import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Card } from '../'
import { htmlToReactParser } from '../../utils'

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
    ...props,
}) => {
    return (
        <Card className="w-100 max-width-800 m-2">
            <div className='d-flex justify-content-between'>
                <h4>
                    <span
                        className="text-success mr-2"
                        style={{ fontSize: 22 }}
                    >
                        <FontAwesomeIcon
                            icon={['fal', icon]}
                        />
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
                        fontSize: 22,
                        zIndex: 100 // ui hack so the button is always accessible
                    }}
                >
                    <FontAwesomeIcon
                        icon={['fal', 'times']}
                        color='white'
                    />
                </button>
            </div>

            <div className="row mt-4">
                <div
                    className={classnames(
                        'col-12',
                        'col-md-7',

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
    )
}

FocusedCard.defaultProps = {
    onCancel: () => true
}

FocusedCard.propTypes = {
    title: PropTypes.string,
    summary: PropTypes.string,
    icon: PropTypes.string,
    callToAction: PropTypes.string,
    htmlContent: PropTypes.string,
    onCancel: PropTypes.func,
}

export default FocusedCard