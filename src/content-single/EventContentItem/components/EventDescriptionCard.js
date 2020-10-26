import React from 'react';
import PropTypes from 'prop-types';

import { htmlToReactParser } from 'utils';

import { Card, Col } from 'ui';

import Tags from './Tags';

const EventDescriptionCard = ({ htmlContent, tags }) => {
  if (!htmlContent) {
    return null;
  }

  return (
    <Col className="col-12 col-lg-8">
      <Card>
        <div>{htmlToReactParser.parse(htmlContent)}</div>
        <Tags tags={tags} />
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
