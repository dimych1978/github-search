import styled from 'styled-components';

export const UsersContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserItem = styled.div<{ selected: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#e0e0e0' : 'transparent')};
  width: 100%;
  max-width: 300px;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;