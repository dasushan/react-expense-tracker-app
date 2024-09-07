import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import expensesReducer from './components/store/expensesSlice';
import authReducer from './components/store/authSlice';
import themeReducer from './components/store/themeSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    //Automatically create a store instance if no store was passes in
    store = configureStore({
      reducer: {
        expenses: expensesReducer,
        auth: authReducer,
        theme: themeReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query funcitons
  return { store, ...render( ui, { wrapper: Wrapper, ...renderOptions }) };
}
