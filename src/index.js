import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//import { AuthContextProvider } from './components/store/auth-context';
//import { ExpenseContextProvider } from './components/store/expense-context';

import { Provider } from 'react-redux';
import { store } from './components/store/index';
import { getAuthStatus } from './components/store/authSlice';

store.dispatch(getAuthStatus());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
