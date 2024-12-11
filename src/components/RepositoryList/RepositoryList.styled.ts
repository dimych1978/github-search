import styled from 'styled-components';

export const RepositoriesContainer = styled.div`
  margin-top: 1rem;
`;

export const RepositoryItem = styled.div`
  padding: 0.5rem;

  a {
    text-decoration: none;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }
`;