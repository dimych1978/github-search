import React from 'react';
import { SearchBarContainer } from './SearchBar.styled';

interface SearchBarProps {
  username: string;
  setUsername: (value: string) => void;
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLImageElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ username, setUsername, handleSearch }) => {
  return (
    <SearchBarContainer>
      <input
        type='text'
        placeholder='Search GitHubLaunch'
        value={username}
        onChange={e => setUsername(e.target.value)}
        onKeyUp={handleSearch}
      />
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg'
        alt='Search Icon'
        onClick={handleSearch}
        tabIndex={0}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;