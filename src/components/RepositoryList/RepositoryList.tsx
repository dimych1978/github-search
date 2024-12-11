import React from 'react';
import { RepositoryItem, RepositoriesContainer } from './RepositoryList.styled';
import { Repository } from '../../types';

interface RepositoryListProps {
  repositories: Repository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <RepositoriesContainer>
      {repositories.map(repo => (
        <RepositoryItem key={repo.id}>
          <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
            {repo.name}
          </a>
        </RepositoryItem>
      ))}
    </RepositoriesContainer>
  );
};

export default RepositoryList;