import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Collapse } from 'react-bootstrap';
import { AngleDown } from '../Icons';

// Styling and layout for the physical accordion item
//  that the user interacts with
const AccordionItem = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fontAwesomeProps = {};
  if (isOpen) fontAwesomeProps.rotation = 180;

  return (
    <div className={classnames('col-12', 'col-md-6', 'py-1', 'px-3')}>
      <div
        className={classnames(
          'bg-white',
          'rounded',
          'shadow-sm',
          'border',
          'border-light'
        )}
      >
        <button
          variant="link"
          onClick={() => setIsOpen(!isOpen)}
          className={classnames(
            'p-3',
            'w-100',
            'text-left',
            'bg-transparent',
            'rounded',
            'focus-indicator-none',
            'd-flex',
            'flex-row',
            'justify-content-between',
            'align-items-center',
            'border-0'
          )}
        >
          <span>{title}</span>
          <span>
            <AngleDown size={48} />
          </span>
        </button>
        <Collapse in={isOpen}>
          <div className="m-3">{children}</div>
        </Collapse>
      </div>
    </div>
  );
};

AccordionItem.defaultProps = {
  paginate: false,
  threshold: 2,
};

AccordionItem.propTypes = {
  paginate: PropTypes.bool,
  threshold: PropTypes.number,
};

export default AccordionItem;
