import React from 'react';
import PropTypes from 'prop-types';

import { htmlToReactParser } from 'utils';

import { Card, Col } from 'ui';

const EventDescriptionCard = ({ htmlContent, tags }) => {
  if (!htmlContent) {
    return null;
  }

  return (
    <Col className="col-12 col-lg-8  p-2 px-lg-3 pl-xl-0">
      <Card>
        <div>{htmlToReactParser.parse(htmlContent)}</div>

        <div className="mx-n1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={'badge badge-light font-weight-normal py-2 px-3 mx-1'}
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </Col>
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
