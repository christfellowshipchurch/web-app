import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { themeGet, baseUnit } from 'styles/theme';

// :: Styled Components
// ------------------------

const Container = styled.div`
  margin-bottom: ${baseUnit(4)};
`;

const Header = styled.div`
  margin-bottom: ${baseUnit(2)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: ${themeGet('fontSize.h4')};
  color: ${themeGet('font.h4')};
  font-weight: ${themeGet('fontWeight.semiBold')};
`;

const Action = styled.span`
  cursor: pointer;
  font-size: ${themeGet('fontSize.medium')};
  color: ${themeGet('brand')};

  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  position: relative;
  min-height: 150px;
`;

// :: Main Component
// ------------------------

const EditGroupItem = ({ children, title, action, actionLabel }) => {
  return (
    <Container>
      <Header>
        <span>{title}</span>
        <Action onClick={action}>{actionLabel}</Action>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

EditGroupItem.defaultProps = {
  action: () => {},
};

EditGroupItem.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  actionLabel: PropTypes.string,
};

export default EditGroupItem;
