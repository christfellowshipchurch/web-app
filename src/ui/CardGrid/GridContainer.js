import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CardContainer from './CardContainer'
import PreviewCard from './PreviewCard'
import FocusedCard from './FocusedCard'

const GridContainer = ({
    fill,
    cardContainerProps,
    data,
    PreviewComponent,
    ActiveComponent,
}) => {
    const [activeCard, setActiveCard] = useState(-1)
    const [cardHeight, setCardHeight] = useState()

    const onFocusCardResize = ( n ) => {
        // set the state of minHeight to be the height of the card
        setCardHeight(n)
    }

    return (
        <div
            style={{ minHeight: cardHeight }}
            className={classnames(
                'p-relative',
                {
                    'container-fluid': fill,
                    'container': !fill,
                })}
        >
            <div
                style={{
                    transition: 'all .2s ease-in-out',
                    transform: activeCard >= 0 ? 'scale(0.9)' : 'scale(1)',
                }}
                className={classnames(
                    'row',
                    {
                        'opacity-0': activeCard >= 0,
                        'opacity-100': activeCard < 0,
                    }
                )}
            >
                {data.map((n, i) => <CardContainer
                    key={`CardContainer:${i}`}
                    {...cardContainerProps}
                >
                    {React.createElement(
                        PreviewComponent,
                        {
                            ...n,
                            onClick: () => setActiveCard(i)
                        },
                    )}
                </CardContainer>)}
            </div>
            <div
                style={{
                    minHeight: '100%',
                    minWidth: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: activeCard >= 0 ? 'all' : 'none',
                    transition: 'all .2s ease-in-out',
                    transform: activeCard >= 0 ? 'scale(0.9)' : 'scale(1)',
                }}
                className={classnames(
                    "bg-transparent",
                    'd-flex',
                    'align-items-center',
                    'justify-content-center',
                    {
                        'opacity-100': activeCard >= 0,
                        'opacity-0': activeCard < 0,
                    }
                )}
            >
                {activeCard >= 0 && React.createElement(
                    ActiveComponent,
                    {
                        ...data[activeCard],
                        onCancel: () => setActiveCard(-1),
                        onResize: (n) => setCardHeight(n)
                    },
                )}
                {console.log({cardHeight})}
            </div>
        </div>
    )
}

GridContainer.defaultProps = {
    fill: false,
    cardContainerProps: {},
    data: [],
    PreviewComponent: PreviewCard,
    ActiveComponent: FocusedCard,
}

GridContainer.propTypes = {
    fill: PropTypes.bool,
    cardContainerProps: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.object
    ),
    PreviewComponent: PropTypes.func,
    ActiveComponent: PropTypes.func,
}

export default GridContainer