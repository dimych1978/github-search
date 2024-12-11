import exp from 'constants';
import styled from 'styled-components';

export const AppContainer = styled.div`
  text-align: center;
`;

export const PaginationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fa;
  box-shadow: 0 -1px 6px rgba(32, 33, 36, 0.28);
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 0 5px;
      cursor: pointer;

      a {
        padding: 5px 10px;
        border: 1px solid #dfe1e5;
        border-radius: 4px;
        color: #5f6368;
        text-decoration: none;

        &:hover {
          background-color: #9e9e9e9c;
          border: 1px solid #dadce0;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      }

      &.active a {
        background-color: #007bff;
        color: #fff;
        border-color: #007bff;
      }
    }
  }
`;

export const HeaderRepo = styled.div`
  margin: 18rem auto 0;
  display: flex;
  align-items: center;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 10px 20px;
  width: fit-content;
  max-width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
`;

export const BackButton = styled.div`
  width: 50px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    filter: invert(20%) sepia(80%) saturate(500%) hue-rotate(230deg)
      brightness(90%) contrast(90%);
  }
`;

export const SkeletonContainer = styled.div`
  margin-top: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index:  2000;

  .user {
    margin-bottom: 0.5rem;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
`;
