import { themeGet } from 'styles/theme';
import styled from 'styled-components';

const ResourceDetails = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: ${themeGet('fontSize.medium')};
  justify-content: space-between;
  min-height: 42px;
  position: relative;
  width: 100%;
`;

export default ResourceDetails;
