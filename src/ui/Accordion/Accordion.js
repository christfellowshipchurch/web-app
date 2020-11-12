import React from 'react';
import PropTypes from 'prop-types';
import { PaginationWrapper, AccordionItems } from '.';

// Main container for all Bootstrap accordion classes,
//  and it also distinguished whether the paginated
//  wrapper should be called or not
//
// ** The reason this is a separate file from the AccordionItems is
//      so that the mapping logic can be used here and also in the
//      PaginationWrapper without having to rewrite it **
const Accordion = ({ children, paginate, threshold }) => {
  return (
    <div className="conatiner-fluid">
      <div className="row">
        {paginate ? (
          <PaginationWrapper threshold={threshold}>{children}</PaginationWrapper>
        ) : (
          <AccordionItems>{children}</AccordionItems>
        )}
      </div>
    </div>
  );
};

Accordion.defaultProps = {
  paginate: false,
  threshold: 8,
};

Accordion.propTypes = {
  paginate: PropTypes.bool,
  threshold: PropTypes.number,
};

export default Accordion;
