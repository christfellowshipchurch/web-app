import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

// :: Styled Components
// ------------------------

const Container = styled.div`
  display: grid;
  /* flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch; */
  grid-template-rows: 1fr 1fr;
  grid-gap: ${baseUnit(1)};
`;

const ButtonContainer = styled.div`
  display: inline-flex;
  flex: 0.5;
  margin-bottom: ${baseUnit(1)};
`;

// :: Main Component
// ------------------------
const GroupCTAs = ({ headline, subHeadline }) => {
  return (
    <Container>
      <ButtonContainer>
        <a className="btn btn-primary text-white w-100">Join Meeting</a>
      </ButtonContainer>
      <ButtonContainer>
        <a className="btn btn-primary text-white w-100">Check In</a>
      </ButtonContainer>
    </Container>
  );
};

GroupCTAs.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default GroupCTAs;
