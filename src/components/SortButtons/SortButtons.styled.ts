import styled from 'styled-components';

export const SortButtonsContainer = styled.div`
   display: flex;
  justify-content: center;
  margin-top: 20px;
 button {
  background-color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #5f6368;
  font-size: 14px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }
  button:hover {
  border: 1px solid #dadce0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
`;