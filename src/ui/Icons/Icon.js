import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase, camelCase, upperFirst, flow } from 'lodash'
import { Icons } from './index'

const pascalCase = (string) =>
  flow(
    camelCase,
    upperFirst
  )(string);


const Icon = ({ name, size, fill }) => {

  const IconComponent = Icons[pascalCase(name)];
  
  return (
    React.createElement(
      IconComponent,
      {
        size: size,
        fill: fill
      }
    )
  )}

export default Icon

Icon.propTypes = { 
  name: PropTypes.string,
  size: PropTypes.number,
  fill: PropTypes.string,
};

Icon.defaultProps = {
  name: 'home',
  size: 24,
}