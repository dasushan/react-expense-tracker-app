import React from 'react';
import { useState, useEffect } from 'react';

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
  removeExpense: (id) => {},
  editExpense: (id) => {},
  newAmount: 0,
  newDescription: '',
  newCategory: '',
  
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [newAmount, setNewAmount] = useState(0);
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  
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
  const removeExpenseHandler = (id) => {
    console.log(id);
    fetch(
      'https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json',
      {
        method: 'GET',
      }
    ).then(async (response) => {
      const result = await response.json();
      const keys = Object.keys(result);
      console.log(keys);
      let entry;
      keys.forEach((key) => {
        const value = result[key];
        if (value.id === id) {
          entry = key;
        }
      });
      console.log(entry);
      fetch(
        `https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${entry}.json`,
        {
          method: 'DELETE',
        }
      ).then(async (response) => {
        const result = await response.json();
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
      });
    });
  };

  const editExpenseHandler = (id) => {
    console.log(id);
    fetch(
      'https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json',
      {
        method: 'GET',
      }
    ).then(async (response) => {
      const result = await response.json();
      const keys = Object.keys(result);
      console.log(keys);
      let entry;
      keys.forEach((key) => {
        const value = result[key];
        if (value.id === id) {
          entry = key;
        }
      });
      console.log(entry);
      const value = result[entry];
      console.log(value)
      
      console.log(typeof(value.amount))
      setNewAmount(Number(value.amount));
      console.log(typeof(Number(value.amount)))
      setNewCategory(value.category);
      setNewDescription(value.description)
    });
  };
  const contextValue = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    editExpense: editExpenseHandler,
    newAmount: newAmount,
    newDescription: newDescription,
    newCategory: newCategory,
    
  };
  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;
