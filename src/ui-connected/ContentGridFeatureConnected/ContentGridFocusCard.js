import React, { useEffect, useState, useRef } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Card, Media } from 'ui'
import { htmlToReactParser } from '../../utils'
import { Icon } from 'ui/Icons'

const FocusedCard = ({
    title,
    subtitle,
    htmlContent,
    callsToAction,
    image,
    onCancel,
    onResize // calls this function when this card changes size
}) => {
    const ref = useRef(null)

    useEffect(() => {
        onResize(ref.current.clientHeight)
    })

    const imageUrl = get(image, 'sources[0].uri', null)

    console.log({image})

    return (
        <div 
            ref={ref}
            className='w-100 h-100 d-flex justify-content-center'
        >
            <Card
                className="container"
                style={{ zIndex: 1000 }}
            >
                <div 
                    className='d-flex justify-content-end'
                >
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
                
                <div className="row mx-md-4 mb-4 pt-3">
                    {imageUrl && 
                        <Media
                            className='col-12 col-md-6'
                            imageUrl={imageUrl}
                            ratio='4by3'
                            rounded
                        />  
                    }
                    <div className={classnames(
                        'pl-md-4',
                        {
                            'col-12 col-md-6': imageUrl,
                            'pt-3': imageUrl
                        }
                    )}>
                        <h3>
                            {title}
                        </h3>
                        <h4 className='font-weight-normal'>{subtitle}</h4>
                        {htmlToReactParser.parse(htmlContent)}
                    </div>
                </div>
            </Card>
        </div>
    )
}

FocusedCard.defaultProps = {
    onCancel: () => true,
    onResize: () => true,
}

FocusedCard.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
    callsToAction: PropTypes.string,
    htmlContent: PropTypes.string,
    onCancel: PropTypes.func,
    onResize: PropTypes.func,
}

export default FocusedCard