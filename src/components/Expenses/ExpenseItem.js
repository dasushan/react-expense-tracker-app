import classes from './ExpenseItem.module.css'
import ExpenseContext from '../store/expense-context'
import { useContext } from 'react'
const ExpenseItem =(props) => {
    const expenseCtx = useContext(ExpenseContext);
    const deleteHandler = () =>{
        expenseCtx.removeExpense(props.id)
    }
    return(
        <li className={classes.expenseitem}>
            <div className={classes.content}>
                <div className={classes.description}>
                    <h4>{props.category}</h4>
                    <p>{props.description}</p>
                </div>
                <div className={classes.price}>${props.amount}</div>
            </div>
            <button onClick={deleteHandler}>Delete</button>
            {/* <button onClick={() => {expenseCtx.editExpense(props.id)}}>Edit</button> */}
        </li>
    )
}

export default ExpenseItem