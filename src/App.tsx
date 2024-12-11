import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ReactPaginate from 'react-paginate';
import { TOKEN } from './token';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import SortButtons from './components/SortButtons/SortButtons';
import UserList from './components/UserList/UserList';
import RepositoryList from './components/RepositoryList/RepositoryList';
import {
  AppContainer,
  PaginationContainer,
  BackButton,
  SkeletonContainer,
  HeaderRepo,
} from './App.styled';
import { User, Repository } from './types';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRepositories, setShowRepositories] = useState<boolean>(false);
  const usersPerPage = 20;

  const handleSearch = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLImageElement>
  ) => {
    if (
      e.type === 'click' ||
      (e.type === 'keyup' && 'key' in e && e.key === 'Enter')
    ) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${username}+in:login`,
          {
            headers: {
              Authorization: `token ${TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data.items) {
          throw new Error('No items found in the response');
        }

        const usersWithRepoCount = await Promise.all(
          data.items.map(async (user: User) => {
            const userResponse = await fetch(
              `https://api.github.com/users/${user.login}`,
              {
                headers: {
                  Authorization: `token ${TOKEN}`,
                },
              }
            );

            if (!userResponse.ok) {
              throw new Error(`Failed to fetch user data for ${user.login}`);
            }

            const userData = await userResponse.json();
            return { ...user, public_repos: userData.public_repos };
          })
        );

        setUsers(usersWithRepoCount);
        setSelectedUser(null);
        setRepositories([]);
        setShowRepositories(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
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

      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories for ${user.login}`);
      }

      const reposData = await reposResponse.json();
      setRepositories(reposData);
      setSelectedUser(user);
      setShowRepositories(true);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToUsers = () => {
    setShowRepositories(false);
    setSelectedUser(null);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <AppContainer>
      <Header>
        <SearchBar
          username={username}
          setUsername={setUsername}
          handleSearch={handleSearch}
        />
        <SortButtons handleSort={handleSort} />
      </Header>
      {showRepositories ? (
        <>
          <HeaderRepo>
            <h2>Пользователь {selectedUser?.login}</h2>
            <BackButton onClick={handleBackToUsers}>
              <img src='/back_arrow_6e84u7mq5gl5.svg' alt='Back' />
            </BackButton>
          </HeaderRepo>
          <RepositoryList repositories={repositories} />
        </>
      ) : (
        <>
          {loading ? (
            <SkeletonContainer>
              {Array(12)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className='user' >
                    <Skeleton
                      height={20}
                      width={200}
                      baseColor='#e0e0e0'
                      highlightColor='#f0f0f0'
                    />
                  </div>
                ))}
            </SkeletonContainer>
          ) : (
            <>
              <UserList
                users={currentUsers}
                selectedUser={selectedUser}
                handleUserClick={handleUserClick}
              />
              <PaginationContainer>
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
              </PaginationContainer>
            </>
          )}
        </>
      )}
    </AppContainer>
  );
};

export default App;
