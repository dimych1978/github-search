import React from 'react';
import { HeaderContainer, Logo } from './Header.styed';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <HeaderContainer>
      <Logo>GitHubLaunch</Logo>
      {children}
    </HeaderContainer>
  );
};

export default Header;