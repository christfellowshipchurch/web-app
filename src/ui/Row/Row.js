import React from 'react';
import classnames from 'classnames';

const Row = ({ children }) => {
  const classes = {
    row: classnames('row', 'align-items-center'),
  };

  return children.length ? (
    <div className={classes.row}>
      {children.map((n, i) => {
        const classes = classnames('col-12', {
          'col-md': i === children.length - 1,
          'col-md-4': i !== children.length - 1,
        });
        return (
          <div className={classes} key={i}>
            {n}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="col-12">{children}</div>
  );
};

export default Row;
