import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

// :: Styled Components
// ------------------------

const Headline = styled.h1`
  color: ${({ theme }) => theme.font.h1};
`;

const SubHeadline = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSize.h3};
  color: ${({ theme }) => theme.font.h3};
`;

// :: Main Component
// ------------------------
const GroupCTAs = ({ headline, subHeadline }) => {
  return (
    <div>
      <a className="btn btn-primary mb-3 text-white w-100">Join Meeting</a>
    </div>
  );
};

GroupCTAs.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default GroupCTAs;
