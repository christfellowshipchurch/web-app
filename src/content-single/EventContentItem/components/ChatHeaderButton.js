import styled from 'styled-components/macro';
import { baseUnit } from 'styles/theme';

const HeaderButton = styled.button`
  padding: ${baseUnit(1)};
  border: none;
  background: none;
  color: ${({ theme }) => theme.link};
`;

export default HeaderButton;
