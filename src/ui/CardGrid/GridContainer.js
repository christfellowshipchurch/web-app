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

    return (
        <div
            className={classnames({
                'container-fluid': fill,
                'container': !fill,
            })}
        >
            <div
                style={{
                    transition: 'all .2s ease-in-out',
                    transform: activeCard >= 0 ? 'scale(0.9)' : 'scale(1)',
                    opacity: activeCard >= 0 ? '0.35' : '1',
                }}
                className={classnames(
                    'row'
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
            {activeCard >= 0 && <div
                style={{
                    minHeight: '100%',
                    minWidth: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
                className={classnames(
                    "bg-transparent",
                    'd-flex',
                    'align-items-center',
                    'justify-content-center',
                )}
            >
                {React.createElement(
                    ActiveComponent,
                    {
                        ...data[activeCard],
                        onCancel: () => setActiveCard(-1)
                    },
                )}
            </div>}
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