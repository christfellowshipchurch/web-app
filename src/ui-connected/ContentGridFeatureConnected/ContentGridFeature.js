import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ContentGridFocusCard from './ContentGridFocusCard'
import ContentGridPreviewCard from './ContentGridPreviewCard'

// TODO : make sure that the properties are all being passed/handled
//        correctly for this component. All that was done was a copy/
//        paste from the `ui/CardGrid` component.
const ContentGridFeature = ({ 
    blocks, 
    PreviewComponent, 
    FocusedComponent 
}) => {
    const [activeCard, setActiveCard] = useState(-1);
    const [cardHeight, setCardHeight] = useState();

    return (
        <div
            style={{ minHeight: cardHeight }}
            className={classnames(
                'p-relative',
                'container-fluid',
            )}
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
                    },
                    'mb-5',
                    'justify-content-center'
                )}
            >
                {blocks.map((n, i) => (
                    <div 
                        className={classnames(
                            'col-12',
                            'col-md-6', 
                            'px-1', 
                            'py-2',
                        )}
                        key={`CardContainer:${i}`}
                        size={{ xs: '6' }}
                    >
                        {React.createElement(
                            PreviewComponent,
                            {
                                ...n,
                                onClick: () => setActiveCard(i),
                            },
                        )}
                    </div>
                ))}
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
                    'bg-transparent',
                    'd-flex',
                    'align-items-center',
                    'justify-content-center',
                    {
                        'opacity-100': activeCard >= 0,
                        'opacity-0': activeCard < 0,
                    },
                    'w-100'
                )}
            >
                {activeCard >= 0 && React.createElement(
                    FocusedComponent,
                    {
                        ...blocks[activeCard],
                        onCancel: () => setActiveCard(-1),
                        onResize: (n) => setCardHeight(n),
                    },
                )}
            </div>
        </div>
    );
};

ContentGridFeature.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    blocks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        htmlContent: PropTypes.string,
        image: PropTypes.shape({
            sources: PropTypes.arrayOf(PropTypes.shape({
                uri: PropTypes.string,
            })),
        }),
        callsToAction: PropTypes.arrayOf(PropTypes.shape({
            call: PropTypes.string,
            action: PropTypes.string,
        })),
    })),
    primaryAction: PropTypes.shape({
        title: PropTypes.string,
        action: PropTypes.string,
    }),
    PreviewComponent: PropTypes.func,
    FocusedComponent: PropTypes.func,
};

ContentGridFeature.defaultProps = {
    primaryAction: {
        title: 'Learn More',
    },
    PreviewComponent: ContentGridPreviewCard,
    FocusedComponent: ContentGridFocusCard,
};

export default ContentGridFeature;
