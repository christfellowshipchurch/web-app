import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase, camelCase, upperFirst, flow } from 'lodash';
import { Icons } from './index';

const pascalCase = (string) => flow(camelCase, upperFirst)(string);

const Icon = ({ name, size, fill, className, onClick }) => {
  const IconComponent = Icons[pascalCase(name)];

  return (
    <span className={className} onClick={onClick}>
      {React.createElement(IconComponent, {
        size,
        fill,
      })}
    </span>
  );
};

export default Icon;

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  name: 'home',
  size: 24,
  fill: '',
  className: '',
  onClick: () => {},
};
