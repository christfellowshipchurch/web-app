import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { kebabCase, toLower } from 'lodash';

const FilterButtons = ({ filters, selected, onChange, onClick }) => (
  <div className="row justify-content-center my-0 mb-n5 my-md-4">
    {filters.map((n, i) => (
      <div
        key={i}
        className="mr-2"
        onClick={(e) => {
          e.preventDefault();
          onChange({ id: n.id, title: n.title });
          onClick();
        }}
      >
        <Link
          to={`/discover/${toLower(kebabCase(n.title))}`}
          style={{
            border: selected.id !== n.id ? '2px solid #d6d6d6' : 'none',
            ...(selected.id === n.id ? { color: 'white' } : {}),
            letterSpacing: 1,
          }}
          className={classnames('h5', 'btn', 'p-2', 'p-md-3', 'focus-indicator-none', {
            'btn-primary': selected.id === n.id,
            'btn-outline': selected.id !== n.id,
          })}
        >
          {n.title}
        </Link>
      </div>
    ))}
  </div>
);

FilterButtons.propTypes = {
  filters: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  selected: PropTypes.string,
};

FilterButtons.defaultProps = {
  filter: null,
  title: null,
};

export default FilterButtons;
