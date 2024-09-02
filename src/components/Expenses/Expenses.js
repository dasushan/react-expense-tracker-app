import classes from './Expenses.module.css';
import NewExpense from '../NewExpense/NewExpense';
import ExpensesList from './ExpensesList';
import { useSelector } from 'react-redux';
import { getExpensesAmount } from '../store/expensesSlice';
const Expenses = () => {
  const expensesAmount = useSelector(getExpensesAmount);
  
  return (
    <>
      {expensesAmount > 10000 && (
        <div className={classes.action}>
          <button>Activate Premium</button>
        </div>
      )}

      <NewExpense />
      <ExpensesList />
    </>
  );
};

export default Expenses;
