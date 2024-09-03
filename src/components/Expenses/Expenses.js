import classes from './Expenses.module.css';
import { useState } from 'react';

import NewExpense from '../NewExpense/NewExpense';
import ExpensesList from './ExpensesList';
import { useSelector } from 'react-redux';
import { getExpensesAmount } from '../store/expensesSlice';
import PremiumFeatures from './PremiumFeatures';

import { toggle } from '../store/themeSlice';
import { useDispatch } from 'react-redux';
const Expenses = () => {
  const expensesAmount = useSelector(getExpensesAmount);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const dispatch = useDispatch();
  const clickHandler = () => {
    
    dispatch(toggle())  
  }
  return (
    <>
      {expensesAmount > 10000 && (
        <div className={classes.action}>
          <button
            onClick={() => {
              setShowDownloadButton(!showDownloadButton);
            }}
          >
            Activate Premium
          </button>
          
        </div>
      )}
      {showDownloadButton && (
        <div className={classes.action}>
          <PremiumFeatures />
          <button onClick={clickHandler}>Theme Toggler</button>
        </div>
        
      )}

      <NewExpense />
      <ExpensesList />
    </>
  );
};

export default Expenses;
