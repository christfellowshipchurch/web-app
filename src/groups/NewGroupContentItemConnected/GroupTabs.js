import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit, themeGet } from 'styles/theme';

import { Card } from 'ui';

// :: Styled Components
// ------------------------

export const GroupTabs = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tab = styled.h4`
  padding: ${baseUnit(2)} ${baseUnit(3)};
  margin-right: ${baseUnit(1)};
  margin-bottom: 0;
  font-weight: ${themeGet('fontWeight.semiBold')};
  color: ${({ active, theme }) => (active ? theme.font[900] : theme.font.h4)};
  border-bottom: 3px solid;
  border-bottom-color: ${({ active, theme }) => (active ? theme.brand : 'transparent')};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  transition: border-color 0.2s ease-out;
  box-sizing: border-box;

  &:hover {
    border-bottom-color: ${({ active, theme }) =>
      active ? theme.brand : theme.font[200]};
  }
`;

const TabContent = styled(Card)`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  width: 100%;
  min-height: 33vh;
  height: 100%;
`;

// :: Main Components
// ------------------------

export const GroupTab = ({ label, active, onClick }) => {
  return (
    <Tab active={active} onClick={() => onClick(label)}>
      {label}
    </Tab>
  );
};

GroupTab.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const GroupTabContent = ({ active, children }) => {
  return <TabContent active={active}>{children}</TabContent>;
};

GroupTabContent.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
};
