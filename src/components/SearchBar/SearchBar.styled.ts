import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 10px 20px;
  width: 582px;
  max-width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
  }

  img {
    cursor: pointer;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
    filter: invert(20%) sepia(80%) saturate(500%) hue-rotate(230deg)
      brightness(90%) contrast(90%);
  }
`;
