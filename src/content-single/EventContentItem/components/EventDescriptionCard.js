import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { htmlToReactParser } from 'utils';

import { Card } from 'ui';

const EventDescriptionCard = ({ htmlContent, tags }) => {
  if (!htmlContent) {
    return null;
  }

  return (
    <div className="col-12 col-lg-8 p-2">
      <Card>
        <div className="">{htmlToReactParser.parse(htmlContent)}</div>

        <div className="mx-n1">
          {tags.map((n, i) => (
            <span
              key={i}
              className={classnames(
                'badge',
                'badge-light',
                'font-weight-normal',
                'py-2',
                'px-3',
                'mx-1'
              )}
            >
              {n}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};

EventDescriptionCard.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

EventDescriptionCard.defaultProps = {
  tags: [],
};

export default EventDescriptionCard;
