import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

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
      <Headline>h1</Headline>
      <SubHeadline>h2</SubHeadline>
    </div>
  );
};

GroupCTAs.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default GroupCTAs;
