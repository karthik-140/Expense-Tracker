import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: "expense",
    initialState: {expenseList: [], showExpenses: false},
    reducers:{
        addExpenses(state, action){
           state.expenseList = action.payload.add
           state.showExpenses = true;
        },
        showExpenses(state){
            state.showExpenses = !state.showExpenses;
        }
    }
}) 

export const expenseActions = expenseSlice.actions;

export default expenseSlice;