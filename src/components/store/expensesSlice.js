import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const EXPENSES_URL = 'https://react-backend-app-f330f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json'

const initialState = {
    expenses: [],
    status: 'idle', // 'idle' |  'loading'  |  'succeeded' | 'failed'
    error: null,
    totalAmount: 0
};

export const  fetchExpenses = createAsyncThunk('/expenses/fetchExpenses', async () => {
   try{
    const response = await fetch(EXPENSES_URL, {
        method: 'GET'
    })
    const result = await response.json();
    console.log(result)
    const resArr = [];
    Object.keys(result).forEach((key) => {
        const value = result[key];
        resArr.push(value)
    })
    return [...resArr];
   } catch(err){
    return err.message
   }
})

export const addNewExpense = createAsyncThunk('/expenses/addNewExpense', async (initialExpense) => {
    try{
        const response = await fetch(EXPENSES_URL, {
            method: 'POST',
            body: JSON.stringify(initialExpense),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const result = await response.json();
        return initialExpense
    } catch(err){
        return err.message
    }
})

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        expenseAdded: {
            
        }
    },
    extraReducers(builder){
        builder.addCase(fetchExpenses.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchExpenses.fulfilled, (state, action) => {
            state.status = 'succeeded'
            const expenses = action.payload;
            let amount = 0;
            expenses.forEach((expense) => {
                amount = amount + expense.amount;
            })
            state.totalAmount = amount;
            // Add fetched expenses to the array
            state.expenses = state.expenses.concat(action.payload)
        })
        .addCase(fetchExpenses.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewExpense.fulfilled, (state, action) => {
            state.totalAmount = state.totalAmount + action.payload.amount
            state.expenses.push(action.payload)
        })
    }
})

export const selectAllExpenses = (state) => state.expenses.expenses;
export const getExpensesStatus = (state) => state.expenses.status;
export const getExpensesError = (state) => state.expenses.error;
export const getExpensesAmount = (state) => state.expenses.totalAmount;

export default expensesSlice.reducer