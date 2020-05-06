import React from 'react';
import { useQuery } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { useSandbox } from '.';
import ContentCardConnected from '../content-card-connected';
import { ContentCard, HighlightCard } from '../ui';

const THEME_CARD_MAP = {
    default: ContentCard,
    highlight: HighlightCard,
};

export const CardRowSandbox = ({
    title,
    actions,
}) => {
    const { sandbox } = useSandbox();
    return (
        <div
            className={classnames(
                'container-fluid',
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
                        card={get(THEME_CARD_MAP, sandbox.homeTheme, ContentCard)}
                    />
                ))}
            </div>
        </div>
    );
};
