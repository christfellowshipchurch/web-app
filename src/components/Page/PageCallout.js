import React from 'react';
import PropTypes from 'prop-types';

import { redirectTo } from '../../utils';

import {
  Container, Row, Col,
  Button
} from 'reactstrap';

const DefaultPage = ({ title, route }) => {
  return (
    <Container className="my-5">
      <Row>
        <Col xs="12" className="text-center">
          <h2>{title}</h2>
          <Button color="primary" block onClick={() => { redirectTo(route); }}>
            Check It Out
            </Button>
        </Col>
      </Row>
    </Container>
  );
};

DefaultPage.defaultProps = {};

DefaultPage.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export default DefaultPage;
