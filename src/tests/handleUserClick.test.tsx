import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('handleUserClick', () => {
  test('should display repositories for a selected user', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ items: [{ login: 'user1', repos_url: 'https://api.github.com/users/user1/repos', public_repos: 10 }] }));
    fetchMock.mockResponseOnce(JSON.stringify({ public_repos: 10 }));
    fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, name: 'repo1', html_url: 'https://github.com/user1/repo1' }]));

    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search GitHubLaunch');
    fireEvent.change(searchInput, { target: { value: 'user1' } });
    fireEvent.keyUp(searchInput, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/user1 - 10 repos/)).toBeInTheDocument();
    });

    const userElement = screen.getByText(/user1 - 10 repos/);
    fireEvent.click(userElement);

    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
    });
  });
});