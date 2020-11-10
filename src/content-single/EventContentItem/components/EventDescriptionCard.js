import React from 'react';
import PropTypes from 'prop-types';

import { htmlToReactParser } from 'utils';

import { Card, Col } from 'ui';

import Tags from './Tags';

const EventDescriptionCard = ({ htmlContent, tags, theaterMode }) => {
  if (!htmlContent) {
    return null;
  }

  if (theaterMode) {
    return (
      <div style={{ marginTop: 12 }}>
        <h3>About:</h3>
        <div>{htmlToReactParser.parse(htmlContent)}</div>
        <Tags tags={tags} />
      </div>
    );
  }

  return (
    <Col className="col-12 col-lg-8 pl-lg-3">
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
  theaterMode: PropTypes.bool,
};

EventDescriptionCard.defaultProps = {
  tags: [],
  theaterMode: false,
};

export default EventDescriptionCard;
