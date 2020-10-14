import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const Tags = ({ tags }) => {
  if (isEmpty(tags)) {
    return null;
  }

  return (
    <div className="mx-n1">
      {tags.map((tag, i) => (
        <span key={tag} className={'badge badge-light font-weight-normal py-2 px-3 mx-1'}>
          {tag}
        </span>
      ))}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

Tags.defaultProps = {
  tags: [],
};

export default Tags;
