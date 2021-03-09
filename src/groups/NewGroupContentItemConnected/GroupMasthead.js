import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit, themeGet } from 'styles/theme';

// :: Styled Components
// ------------------------

const Container = styled.hgroup`
  align-items: center;
  display: flex;
  margin-bottom: ${({ mb }) => baseUnit(mb)};
  width: 100%;
`;

const Headline = styled.h1`
  font-size: ${themeGet('fontSize.h1')};
  color: ${themeGet('font.h1')};
  margin-bottom: 0;
  padding-right: ${baseUnit(3)};
`;

const SubHeadline = styled.h3`
  font-size: ${themeGet('fontSize.h5')};
  font-weight: ${themeGet('fontWeight.semiBold')};
  color: ${themeGet('font.400')};
  text-transform: uppercase;
`;

// :: Main Component
// ------------------------

const GroupMasthead = ({ mb, headline, subHeadline }) => {
  return (
    <Container mb={mb}>
      <div>
        {subHeadline && <SubHeadline>{subHeadline}</SubHeadline>}
        <Headline>{headline}</Headline>
      </div>
    </Container>
  );
};

GroupMasthead.propTypes = {
  mb: PropTypes.number,
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

GroupMasthead.defaultProps = {
  mb: 0,
};

export default GroupMasthead;
