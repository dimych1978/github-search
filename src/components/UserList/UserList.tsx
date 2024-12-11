import React from 'react';
import { UserItem, UsersContainer } from './UserList.styled';
import { User } from '../../types';

interface UserListProps {
  users: User[];
  selectedUser: User | null;
  handleUserClick: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, selectedUser, handleUserClick }) => {
  return (
    <UsersContainer>
      {users.map(user => (
        <UserItem
          key={user.id}
          selected={selectedUser?.id === user.id}
          onClick={() => handleUserClick(user)}
        >
          <span>
            {user.login} - {user.public_repos} repos
          </span>
        </UserItem>
      ))}
    </UsersContainer>
  );
};

export default UserList;