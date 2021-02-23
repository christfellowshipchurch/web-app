import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { kebabCase, toLower } from 'lodash';

const BrowseFilters = ({ selected, onChange, filters }) => (
  <div className="row d-flex justify-content-center">
    {filters.map((n, i) => (
      <div
        key={i}
        className="mr-2"
        onClick={(e) => {
          e.preventDefault();
          onChange({ id: n.id });
        }}
      >
        <Link
          to={`/discover/${toLower(kebabCase(n.title))}`}
          style={{
            border: selected !== n.id ? '2px solid #d6d6d6' : 'none',
            ...(selected === n.id ? { color: 'white' } : {}),
            letterSpacing: 1,
          }}
          className={classnames('col', 'h5', 'btn', 'p-3', 'focus-indicator-none', {
            'btn-primary': selected === n.id,
            'btn-outline': selected !== n.id,
          })}
        >
          {n.title}
        </Link>
      </div>
    ))}
  </div>
);

BrowseFilters.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
  filters: PropTypes.array,
};

BrowseFilters.defaultProps = {
  filter: null,
  title: null,
};

export default BrowseFilters;
