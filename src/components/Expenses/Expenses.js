import { useContext } from "react";
import ExpenseContext from "../store/expense-context";
import classes from './Expenses.module.css'
const Expenses = () => {
    const expenseCtx = useContext(ExpenseContext)

    const expensesList = expenseCtx.expenses.map((expense) => {
        return(
            <div>
                <div>{expense.amount}</div>
                <div>{expense.description}</div>
                <div>{expense.category}</div>
            </div>
        )
    })

    return(<ul className={classes.expenses}>
        {expensesList}
    </ul>)
}

export default Expenses