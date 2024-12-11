import styled from 'styled-components';

export const HeaderContainer = styled.div`
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fa; 
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  z-index: 1000; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;`;

export const Logo = styled.div`
  font-family: 'Product Sans', Arial, sans-serif;
  font-size: 80px;
  color: #000;
  margin-bottom: 20px;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
`;