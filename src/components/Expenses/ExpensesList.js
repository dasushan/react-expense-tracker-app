import { useContext, useEffect } from "react";
//import ExpenseContext from "../store/expense-context";
import classes from './ExpensesList.module.css'
import ExpenseItem from "./ExpenseItem";

import { useSelector, useDispatch } from "react-redux";
import { selectAllExpenses, getExpensesStatus, getExpensesError, fetchExpenses } from "../store/expensesSlice";
const ExpensesList = () => {

    const dispatch = useDispatch();
    const expenses = useSelector(selectAllExpenses)
    const expensesStatus = useSelector(getExpensesStatus)
    const error = useSelector(getExpensesError)

    //const expenseCtx = useContext(ExpenseContext)
    useEffect(() => {
        if(expensesStatus === 'idle'){
            dispatch(fetchExpenses())
        }
    }, [expensesStatus, dispatch])
    let expensesList;
    if(expensesStatus === 'loading'){
        expensesList = <p>Loading ...</p>
    } else if(expensesStatus === 'succeeded'){
        expensesList = expenses.map((expense) => {
            return(
                <ExpenseItem category={expense.category} description={expense.description} amount={expense.amount} key={expense.id} id={expense.id} />
            )
        })
    } else if(expensesStatus === 'failed'){
        expensesList = <p>{error}</p>
    }
    //const expensesList = expenses.map((expense) => {
    //     return(
    //         // <div>
    //         //     <div>{expense.amount}</div>
    //         //     <div>{expense.description}</div>
    //         //     <div>{expense.category}</div>
    //         // </div>
    //         <ExpenseItem category={expense.category} description={expense.description} amount={expense.amount} key={expense.id} id={expense.id}/>
    //     )
    // })

    return(<div className={classes.expenses}>
        {expensesList}
    </div>)
}

export default ExpensesList