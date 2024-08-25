import { useContext } from "react";
import ExpenseContext from "../store/expense-context";
import classes from './ExpensesList.module.css'
import ExpenseItem from "./ExpenseItem";
const ExpensesList = () => {
    const expenseCtx = useContext(ExpenseContext)

    const expensesList = expenseCtx.expenses.map((expense) => {
        return(
            // <div>
            //     <div>{expense.amount}</div>
            //     <div>{expense.description}</div>
            //     <div>{expense.category}</div>
            // </div>
            <ExpenseItem category={expense.category} description={expense.description} amount={expense.amount} key={expense.id} id={expense.id}/>
        )
    })

    return(<div className={classes.expenses}>
        {expensesList}
    </div>)
}

export default ExpensesList