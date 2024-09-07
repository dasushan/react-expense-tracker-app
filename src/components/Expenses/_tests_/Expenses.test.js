import { render, screen } from '@testing-library/react';
import Expenses from '../Expenses';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils-for-tests';
import { act } from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
describe('Expenses component', () => {
  test(' renders Activate Premium as a button if totalAmount>10000', () => {
    //Arrange (render the component that we want to test)
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: 15000,
      },
      auth: {
        token: null,
        isLoggedIn: false,
      },
      theme: {
        isDark: false,
      },
    };
    const { store } = renderWithProviders(<Expenses />, { preloadedState });
    //Act
    //...nothing
    //Assert
    const activatePremiumButton = screen.getByRole('button', {
      name: 'Activate Premium',
    });
    expect(activatePremiumButton).toBeInTheDocument();
    expect(store.getState().auth.isLoggedIn).toBe(false);
  });

  test('do not render Activate Premium button if totalAmount<10000', () => {
    //Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: 9999,
      },
      auth: {
        token: null,
        isLoggedIn: true,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });
    //Act
    //...nothing
    //Assert
    const activatePremiumButton = screen.queryByText('Activate Premium', {
      exact: false,
    });
    expect(activatePremiumButton).not.toBeInTheDocument();
  });
  test('do not render Download PDF as a button if Activate Premium button was not clicked', () => {
    //Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: 15000,
      },
      auth: {
        token: null,
        isLoggedIn: false,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });
    //Act
    // Assert
    const activatePremiumButton = screen.queryByText('Activate Premium', {
      exact: false,
    });
    const outputElement = screen.queryByText('Download PDF');
    expect(outputElement).toBeNull();
  });
  test('do not render Theme Toggler as a button if Activate Premium button was not clicked', () => {
    //Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: 15000,
      },
      auth: {
        token: null,
        isLoggedIn: false,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });
    //Act
    // Assert
    const activatePremiumButton = screen.queryByText('Activate Premium', {
      exact: false,
    });
    const outputElement = screen.queryByText('Theme Toggler');
    expect(outputElement).toBeNull();
  });
  test('renders Download PDF as a button if Activate Premium button was clicked', () => {
    //Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: 15000,
      },
      auth: {
        token: null,
        isLoggedIn: false,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });
    //Act
    const activatePremiumButton = screen.getByRole('button', {
      name: 'Activate Premium',
    });
    screen.debug(activatePremiumButton);
    act(() => {
      userEvent.click(activatePremiumButton);
    });

    //Assert
    const downloadPDFButton = screen.queryByText('Download PDF', {
      exact: true,
    });
    expect(downloadPDFButton).toBeInTheDocument();
  });
  test('renders Theme Toggler as a button if Activate Premium button was clicked', () => {
    //Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: 15000,
      },
      auth: {
        token: null,
        isLoggedIn: false,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });
    //Act
    const activatePremiumButton = screen.getByRole('button', {
      name: 'Activate Premium',
    });
    act(() => {
      userEvent.click(activatePremiumButton);
    });
    //Assert
    const themeTogglerButton = screen.queryByText('Theme Toggler', {
      exact: false,
    });
    expect(themeTogglerButton).toBeInTheDocument();
  });
  test('toggles state.theme if Theme Toggler button was clicked', () => {
    //Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: 15000,
      },
      auth: {
        token: null,
        isLoggedIn: false,
      },
      theme: {
        isDark: false,
      },
    };
    const { store } = renderWithProviders(<Expenses />, { preloadedState });
    //Act
    const activatePremiumButton = screen.getByRole('button', {
      name: 'Activate Premium',
    });
    act(() => {
      userEvent.click(activatePremiumButton);
    });
    const themeTogglerButton = screen.getByRole('button', {
      name: 'Theme Toggler',
    });
    act(() => {
      userEvent.click(themeTogglerButton);
    });
    //Assert
    const isDark = store.getState().theme.isDark;
    expect(isDark).toBe(true);
  });
  test('renders ExpensesList component if status:succeeded', () => {
    // Arrange
    const preloadedState = {
      expenses: {
        expenses: [
          {
            amount: 78,
            category: 'Food',
            description: 'Tasty Food',
            id: 111 - 222,
          },
          {
            amount: 1000,
            category: 'Salary',
            description: 'Salary is Low',
            id: 222 - 333,
          },
        ],
        status: 'succeeded',
        totalAmount: null,
      },
      auth: {
        token: null,
        isLoggedIn: true,
      },
      theme: {
        isDark: false,
      },
    };
    const { store } = renderWithProviders(<Expenses />, { preloadedState });
    //Act

    // Assert
    const expenseDesText1 = screen.getByText(/Tasty Food/i);
    const expenseDesText2 = screen.getByText(/Salary is Low/i);
    expect(expenseDesText1).toBeInTheDocument();
    expect(expenseDesText2).toBeInTheDocument();
  });

  test('renders Loading... text if status:idle', () => {
    //Arrange
    const preloadedState = {
      expenses: {
        expenses: [
          {
            amount: 78,
            category: 'Food',
            description: 'Tasty Food',
            id: 111 - 222,
          },
          {
            amount: 1000,
            category: 'Salary',
            description: 'Salary is Low',
            id: 222 - 333,
          },
        ],
        status: 'idle',
        totalAmount: null,
      },
      auth: {
        token: null,
        isLoggedIn: true,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });
    //Act
    //...nothing

    //Assert
    const text = screen.queryByText(/Loading.../i);
    expect(text).toBeInTheDocument();
  });
  test('renders NewExpense Form ', () => {
    // Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: null,
      },
      auth: {
        token: null,
        isLoggedIn: true,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });

    //Act
    //Assert
    expect(screen.queryByText(/Daily Expenses/i)).toBeInTheDocument();
  });

  test('renders NewExpense Form Amount Field ', () => {
    // Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: null,
      },
      auth: {
        token: null,
        isLoggedIn: true,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });

    //Act
    const userInput = screen.getByLabelText(/amount/i)
    const amount ="90";
    userEvent.type(userInput, amount)

    //Assert
    expect(userInput.value).toEqual(amount)
  });
  test('renders NewExpense Form Description Field ', () => {
    // Arrange
    const preloadedState = {
      expenses: {
        expenses: [],
        status: 'idle',
        totalAmount: null,
      },
      auth: {
        token: null,
        isLoggedIn: true,
      },
      theme: {
        isDark: false,
      },
    };
    renderWithProviders(<Expenses />, { preloadedState });

    //Act
    const userInput = screen.getByLabelText(/description/i)
    const description="earn more amount";
    userEvent.type(userInput, description)

    //Assert
    expect(userInput.value).toEqual(description)
  });
});
