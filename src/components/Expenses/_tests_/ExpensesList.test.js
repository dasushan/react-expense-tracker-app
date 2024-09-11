import { renderWithProviders } from '../../../utils-for-tests';
import ExpensesList from '../ExpensesList';
import { screen } from '@testing-library/react';

describe('ExpensesList component', () => {
  test('renders expenses if request succeeds', async () => {
    // Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: null,
      },
      auth: {
        token: null,
        isLoggedIn: false,
      },
      theme: {
        isDark: false,
      },
    };
    const { store } = renderWithProviders(<ExpensesList />, { preloadedState });

    //Act
    // ...nothing

    // Assert
    const listItemElements = await screen.findAllByRole('listitem', {
      timeout: 2000,
    });
    expect(listItemElements).not.toHaveLength(0);
  });
  test('renders expenses if request succeeds', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', amount: 90 }],
    });
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: null,
      },
      auth: {
        token: null,
        isLoggedIn: false,
      },
      theme: {
        isDark: false,
      },
    };
    const { store } = renderWithProviders(<ExpensesList />, { preloadedState });

    //Act
    // ...nothing

    // Assert
    const listItemElements = await screen.findAllByRole('listitem', {
      timeout: 2000,
    });
    expect(listItemElements).not.toHaveLength(0);
  });
});
