export interface User {
    id: number;
    login: string;
    repos_url: string;
    public_repos: number;
  }
  
  export interface Repository {
    id: number;
    name: string;
    html_url: string;
  }