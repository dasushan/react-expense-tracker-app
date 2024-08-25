import React from 'react'
import {useState} from 'react'

const ExpenseContext = React.createContext({
    expenses: [],
    addExpense: (expense) => {},
    removeExpense: (id) => {}
})


export const ExpenseContextProvider =(props) => {
    const [expenses, setExpenses] = useState([]);

    const addExpenseHandler = (expense) => {
        setExpenses((prevState) => {
            return [expense, ...prevState]
        })
    }
    const removeExpenseHandler =(id) => {

    }
    const contextValue = {
        expenses: expenses,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler
    }
    return(
        <ExpenseContext.Provider value={contextValue}>
            {props.children}
        </ExpenseContext.Provider>
    )
}
export default ExpenseContext;