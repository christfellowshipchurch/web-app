import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Card } from 'ui';

// TODO : * clean up and confirm that it's working
//        * make the cards `col-6` for all device sizes
//        * add images? need to confirm that with Josh
const ContentGridPreviewCard = ({
    title,
    subtitle,
    callToAction,
    onClick
}) => (
        <Card className="h-100 m-2">
            <div className="d-flex flex-column h-100">
                <div style={{ flex: 1 }}>
                    <h3
                        className={classnames(
                            'd-flex',
                            'flex-column',
                            'flex-md-row',
                            'm-0',
                        )}
                    >
                        <span className="mb-2 mt-1">
                            {title}
                        </span>
                    </h3>
                </div>
                <div
                    className={classnames(
                        'd-none',
                        'd-md-block',
                    )}
                    style={{ flex: 1 }}
                >
                    <h4 className="text-dark font-weight-normal">
                        {subtitle}
                    </h4>
                </div>
                <div
                    className={classnames(
                        'd-flex',
                        'align-items-end',
                        'mt-4',
                        'justify-content-end'
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
                            'font-weight-normal',
                        )}
                        onClick={onClick}
                    >
                        {callToAction}
                    </button>
                </div>
            </div>
        </Card>
    );

ContentGridPreviewCard.defaultProps = {
    title: '',
    subtitle: '',
    callToAction: 'Learn More',
    onClick: () => true,
};

ContentGridPreviewCard.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    callToAction: PropTypes.string,
    onClick: PropTypes.func,
};

export default ContentGridPreviewCard;
