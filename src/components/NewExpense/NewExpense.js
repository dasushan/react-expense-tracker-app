import classes from './NewExpense.module.css';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
//import ExpenseContext from '../store/expense-context';
import { useDispatch } from 'react-redux';
import { addNewExpense } from '../store/expensesSlice';

const NewExpense = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  // const expenseCtx = useContext(ExpenseContext);
  // console.log(expenseCtx.newCategory);
  const dispatch= useDispatch();
  
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;

    console.log(typeof(enteredCategory))
    const expenseData = {
      amount: enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
      id: uuidv4(),
    };
    //expenseCtx.addExpense(expenseData);
    dispatch(addNewExpense(expenseData))
  };
  return (
    <div className={classes.newexpense}>
      <div>
        <h1>Daily Expenses</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.expensecontrols}>
          <div className={classes.expensecontrol}>
            <label htmlFor="amount">Amount Spent</label>
            <input
              type="number"
              id="amount"
              required
              ref={amountInputRef}
             
            />
          </div>
          <div className={classes.expensecontrol}>
            <label htmlFor="description">Description of Expense</label>
            <input
              type="text"
              id="description"
              required
              ref={descriptionInputRef}
              
            />
          </div>
          <div className={classes.expensecontrol}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              required
              ref={categoryInputRef}
              
            >
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </select>
          </div>
        </div>

        <div className={classes.expenseactions}>
          <button>+ Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default NewExpense;
