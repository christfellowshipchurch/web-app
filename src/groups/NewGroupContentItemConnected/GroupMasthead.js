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
const GroupMasthead = ({ headline, subHeadline }) => {
  return (
    <hgroup>
      <Headline>{headline}</Headline>
      <SubHeadline>{subHeadline}</SubHeadline>
    </hgroup>
  );
};

GroupMasthead.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default GroupMasthead;
