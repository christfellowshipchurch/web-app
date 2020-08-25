import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { slice, uniqueId } from 'lodash';
import { Collapse } from 'react-bootstrap';
import { AccordionItems } from '.';

// Component used to handle breaking the accordion into
//  2 sections based on the threshold given.
//
// If the number of children is greater than the threshold,
//  the wrapper will break the children in half and render
//  the first half visible, while the second half is hidden
//  until "Show more" is clicked
const PaginationWrapper = ({ children, threshold }) => {
  const [isOpen, setIsOpen] = useState(false);
  const paginate = children.length > threshold;

  if (!paginate) return <AccordionItems>{children}</AccordionItems>;

  const firstHalf = slice(children, 0, threshold);
  const secondHalf = slice(children, threshold);

  return (
    <div className="col-12">
      <div className="row">
        <AccordionItems>{firstHalf}</AccordionItems>
      </div>

      <Collapse in={isOpen}>
        <div className="row">
          <AccordionItems offset={threshold}>{secondHalf}</AccordionItems>
        </div>
      </Collapse>

      <div className={classnames('col-12', 'text-center')}>
        <button className="btn btn-link" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? `Show less` : `Show more`}
        </button>
      </div>
    </div>
  );
};

PaginationWrapper.defaultProps = {
  threshold: 8,
};

PaginationWrapper.propTypes = {
  threshold: PropTypes.number,
};

export default PaginationWrapper;
