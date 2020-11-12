import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from '../../../ui/Icons';

export const CampusSelectToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    className="w-100"
    style={{
      verticalAlign: 'middle',
      cursor: 'pointer',
    }}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span className="h4">
      {children}
      <Icon className="ml-2 float-right" name="angle-down" size="22" />
    </span>
  </div>
));

CampusSelectToggle.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
};

CampusSelectToggle.defaultProps = {
  children: {},
  onClick: () => {},
};

export const Row = ({ className, ...props }) => (
  <div className={classnames('my-2', className)} {...props} />
);

Row.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export const TextIconRow = ({ icon, header, children }) => (
  <div classNames={classnames('align-items-center')}>
    <p className={`d-flex align-items-center ${header}`}>
      <Icon name={icon} className="mr-2" />
      {children}
    </p>
  </div>
);

TextIconRow.propTypes = {
  icon: PropTypes.string,
  header: PropTypes.oneOf(['h3', 'h4']),
};
