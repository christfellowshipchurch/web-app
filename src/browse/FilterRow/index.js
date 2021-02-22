import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { kebabCase, toLower } from 'lodash';

const BrowseFilters = ({ selected, onChange, filters }) => (
  <ul className="list-inline text-nowrap overflow-x-scroll mb-n4">
    {filters.map((n, i) => (
      <li
        key={i}
        className="list-inline-item"
        onClick={(e) => {
          e.preventDefault();
          onChange({ id: n.id });
        }}
      >
        <Link
          to={`/discover/${toLower(kebabCase(n.title))}`}
          style={{
            border: selected !== n.id ? '1px solid #d6d6d6' : 'none',
            ...(selected === n.id ? { color: 'white' } : {}),
          }}
          className={classnames(
            'h5',
            'badge',
            'px-3',
            'py-1',
            'focus-indicator-none',
            'font-weight-normal',
            {
              'badge-primary': selected === n.id,
              'badge-light': selected !== n.id,
            }
          )}
        >
          {n.title}
        </Link>
      </li>
    ))}
  </ul>
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
