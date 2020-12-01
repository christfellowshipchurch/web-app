import styled from 'styled-components/macro';

import { themeGet, baseUnit } from 'styles/theme';

const ResourceDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: ${themeGet('fontSize.medium')};
  justify-content: space-between;
  min-height: 42px;
  position: relative;
  width: 100%;
  padding: ${baseUnit(2)} 0;
  border-bottom: 1px ${themeGet('font.200')} solid;
  color: ${themeGet('font.coolGray')};
`;

export default ResourceDetails;
