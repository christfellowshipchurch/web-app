import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { themeGet } from 'styles/theme';

// :: Styled Components
// ------------------------

const Container = styled.hgroup`
  width: 100%;
`;

const Headline = styled.h1`
  font-size: ${themeGet('fontSize.h1')};
  color: ${themeGet('font.h1')};
  margin-bottom: 0;
`;

const SubHeadline = styled.h3`
  font-size: ${themeGet('fontSize.h5')};
  font-weight: ${themeGet('fontWeight.semiBold')};
  color: ${themeGet('font.400')};
  text-transform: uppercase;
`;

// :: Main Component
// ------------------------
const GroupMasthead = ({ headline, subHeadline }) => {
  return (
    <Container>
      {subHeadline && <SubHeadline>{subHeadline}</SubHeadline>}
      <Headline>{headline}</Headline>
    </Container>
  );
};

GroupMasthead.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default GroupMasthead;
