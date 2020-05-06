import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { useSandbox, CardRowSandbox } from '../../sandbox';
import ContentCardConnected from '../../content-card-connected';
import { ContentCard } from '../../ui';

import { CARD_PADDING, MARGIN_Y, PADDING_X } from '..';

const CardRow = ({
    title,
    actions,
}) => {
    const { sandboxEnabled } = useSandbox();

    return sandboxEnabled
        ? <CardRowSandbox title={title} actions={actions} />
        : (
            <div
                className={classnames(
                    'container-fluid',
                    PADDING_X,
                )}
            >
                <div className="row">
                    <div className="col-10 pl-2">
                        <h3>
                            {title}
                        </h3>
                    </div>
                    <div className="col-2 text-right pr-2">
                        <a href="/browse" className="text-dark">
                            See All
            </a>
                    </div>
                </div>
                <div className="row">
                    {actions.map(({ relatedNode }, i) => (
                        <ContentCardConnected
                            key={`CardRow:${relatedNode.id}`}
                            contentId={relatedNode.id}
                        />
                    ))}
                </div>
            </div>
        );
};

export default CardRow;
