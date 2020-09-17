import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { CampusTile } from '../../modules/CampusSelect';

const CampusContentFeatureConnected = ({ campus }) => (
  <div className={classnames('max-width-1100', 'mx-auto', 'py-4')}>
    <CampusTile {...campus} />
  </div>
);

CampusContentFeatureConnected.propTypes = {};

export default CampusContentFeatureConnected;
