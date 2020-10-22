import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

// :: Styled Components
// ------------------------

const Container = styled.div`
  background: cyan;
`;

// :: Main Component
// ------------------------
const GroupCTAs = ({ headline, subHeadline }) => {
  return (
    <Container>
      <a className="btn btn-primary text-white w-100">Join Meeting</a>
    </Container>
  );
};

GroupCTAs.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default GroupCTAs;
