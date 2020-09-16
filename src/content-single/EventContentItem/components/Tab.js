import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { baseUnit } from 'styles/theme';

import { Icon } from 'ui/Icons';

// :: Styled Components
// ------------------------

const TabContainer = styled.div`
  display: inline-flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${baseUnit(3)} ${baseUnit(3)} ${baseUnit(2)};
`;

const TabButton = styled.button`
  background: none;
  border: none;
  text-align: center;
  opacity: ${({ active }) => (active ? 1 : 0.7)};
  transition: opacity 0.15s ease-out;

  &:hover {
    opacity: 1;
  }
`;

// TabIcons need the theme for colors, but don't need any custom styles beyond that.
// The theme drives the `fill` prop in the <Icon /> component.
// We could make a "real" component to solve this, but we'd need to use the withTheme
// HOC or useTheme() hook from styled-components.
// Simpler to use the `attrs` approach and pass empty styles (``).
// @see https://styled-components.com/docs/basics#attaching-additional-props
const TabIcon = styled(Icon).attrs(({ name, active, theme }) => ({
  name,
  fill: active ? theme.brand : theme.card.color,
  size: 36,
}))``;

const TabLabel = styled.span`
  display: block;
  margin-top: ${baseUnit(1)};
  font-weight: bold;
  color: ${({ active, theme }) => (active ? theme.font[900] : theme.card.color)};
`;

// :: Main Component
// ------------------------

const Tab = ({ label, iconName, active, onPress }) => (
  <TabContainer>
    <TabButton type="button" active={active} onClick={onPress}>
      <TabIcon name={iconName} active={active} />
      <TabLabel className="small" active={active}>
        {label}
      </TabLabel>
    </TabButton>
  </TabContainer>
);

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onPress: PropTypes.func,
};

Tab.defaultProps = {
  active: false,
};

export default Tab;
