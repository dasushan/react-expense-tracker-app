import classes from './ExpenseItem.module.css'
const ExpenseItem =(props) => {
    return(
        <li className={classes.expenseitem}>
            <div className={classes.content}>
                <div className={classes.description}>
                    <h4>{props.category}</h4>
                    <p>{props.description}</p>
                </div>
                <div className={classes.price}>${props.amount}</div>
            </div>
            
        </li>
    )
}

export default ExpenseItem