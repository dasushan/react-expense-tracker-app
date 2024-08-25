import React from 'react';
import { useState, useEffect } from 'react';

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
  removeExpense: (id) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch(
      'https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json',
      {
        method: 'GET',
      }
    ).then(async (response) => {
      const result = await response.json();
      console.log(result);
      const resArr = [];
      Object.keys(result).forEach((key) => {
        const value = result[key];
        resArr.push(value);
      });
      console.log(resArr);
      setExpenses(resArr);
    });
  }, []);
  const addExpenseHandler = (expense) => {
    fetch(
      'https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json',
      {
        method: 'POST',
        body: JSON.stringify(expense),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(async (response) => {
      try {
        const result = await response.json();
        console.log(result);
        setExpenses((prevState) => {
          return [...prevState, expense];
        });
      } catch (err) {
        console.log(err);
      }
    });
  };
  const removeExpenseHandler = (id) => {};
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;
