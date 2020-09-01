import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from '../../ui';

const Categories = ({ categories }) =>
  categories.map(
    (n, i) =>
      n !== '' && (
        <Button
          key={i}
          title={n}
          type="dark"
          size="sm"
          className={classnames({ 'mx-2': i !== 0 })}
          disabled
        />
      )
  );

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
};

Categories.defaultProps = {
  categories: [],
};

export default Categories;
