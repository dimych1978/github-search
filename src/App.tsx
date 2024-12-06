import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';
import ReactPaginate from 'react-paginate';
import { TOKEN } from './token';

interface User {
  id: number;
  login: string;
  repos_url: string;
  public_repos: number;
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
}

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const usersPerPage = 20;

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}+in:login`, {
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      });
      const data = await response.json();
      const usersWithRepoCount = await Promise.all(data.items.map(async (user: User) => {
        const userResponse = await fetch(`https://api.github.com/users/${user.login}`, {
          headers: {
            Authorization: `token ${TOKEN}`,
          },
        });
        const userData = await userResponse.json();
        return { ...user, public_repos: userData.public_repos };
      }));
      setUsers(usersWithRepoCount);
      setSelectedUser(null);
      setRepositories([]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    const sortedUsers = [...users].sort((a, b) => {
      if (order === 'asc') {
        return a.public_repos - b.public_repos;
      } else {
        return b.public_repos - a.public_repos;
      }
    });
    setUsers(sortedUsers);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleUserClick = async (user: User) => {
    setLoading(true);
    try {
      const reposResponse = await fetch(user.repos_url, {
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      });
      const reposData = await reposResponse.json();
      setRepositories(reposData);
      setSelectedUser(user);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <div className="App">
      <div className="logo">
        GitHubLaunch
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search GitHubLaunch or type a URL"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg"
          alt="Search Icon"
          onClick={handleSearch}
        />
      </div>
      <div className="sort-buttons">
        <button onClick={() => handleSort('asc')}>Sort by Repos (Asc)</button>
        <button onClick={() => handleSort('desc')}>Sort by Repos (Desc)</button>
      </div>
      {loading ? (
        <div className="users">
          {Array(5).fill(null).map((_, index) => (
            <div key={index} className="user">
              <Skeleton height={20} width={200} />
            </div>
          ))}
        </div>
      ) : (
        <div className="users">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className={`user ${selectedUser?.id === user.id ? 'selected' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              <span>{user.login} - {user.public_repos} repos</span>
            </div>
          ))}
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(users.length / usersPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </div>
      )}
      {selectedUser && (
        <div className="repositories">
          {repositories.map((repo) => (
            <div key={repo.id} className="repository">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;