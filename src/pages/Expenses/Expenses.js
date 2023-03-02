import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import classes from './Expenses.module.css';

const Expenses = () => {
    const [expenseList, setExpenseList] = useState([]);
    const [showExpenses, setShowExpenses] = useState(false);
    const amountInputref = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    const onClickHandler = async (event) => {
        event.preventDefault();
        const enteredAmount = amountInputref.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;
        const expenses = {
            amount: enteredAmount,
            description: enteredDescription,
            category: enteredCategory,
        }
        try {
            const response = await axios.post('https://expense-tracker-aa33e-default-rtdb.firebaseio.com/expenses.json', expenses)
            const idToken = response.data.name;
            const addExpense = { id: idToken, ...expenses }
            setExpenseList([...expenseList, addExpense])
            setShowExpenses(true);
            amountInputref.current.value = '';
            descriptionInputRef.current.value = '';
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        try {
            const fetchExpense = async () => {
                const response = await axios.get(
                    'https://expense-tracker-aa33e-default-rtdb.firebaseio.com/expenses.json'
                )
                const data = response.data;
                const newExpenseArray = [];
                for (let key in data) {
                    newExpenseArray.push({ id: key, ...data[key] })
                }
                setShowExpenses(true);
                if (newExpenseArray.length === 0) {
                    setShowExpenses(false);
                }
                setExpenseList([...newExpenseArray]);
            }
            fetchExpense();
        } catch (err) {
            console.log(err);
        }
    }, [])

    const deleteExpenseHandler = async (expense) => {
        const id = expense.id;
        try {
            await axios.delete(
                `https://expense-tracker-aa33e-default-rtdb.firebaseio.com/expenses/${id}.json`
            )
        } catch (err) {
            console.log(err);
        }
        setExpenseList(expenseList.filter((data) => data.id !== expense.id))
        if (expenseList.length === 1) {
            setShowExpenses(false);
        }
        console.log("Expense is succefully deleted")
    }

    const editExpenseHandler = async (expense) => {
        amountInputref.current.value = expense.amount;
        descriptionInputRef.current.value = expense.description;
        categoryInputRef.current.value = expense.category;
        const id = expense.id;
        try {
            await axios.delete(
                `https://expense-tracker-aa33e-default-rtdb.firebaseio.com/expenses/${id}.json`
            )
        } catch (err) {
            console.log(err);
        }
        setExpenseList(expenseList.filter((data) => data.id !== expense.id))
    }

    const addedExpenses = (
        expenseList.map((exp) => (
            <li key={Math.random()}>
                <div className={classes.amount}>
                    {exp.amount}
                </div>
                <div className={classes.description}>
                    {exp.description}
                </div>
                <div className={classes.category}>
                    {exp.category}
                </div>
                <div className={classes.delete}>
                    <button onClick={() => deleteExpenseHandler(exp)}>Delete</button>
                </div>
                <div className={classes.edit}>
                    <button onClick={() => editExpenseHandler(exp)}>Edit</button>
                </div>
            </li>
        ))
    )

    return (
        <>
            <section className={classes['expense-form']}>
                <header>Add Expenses</header>
                <form>
                    <div className={classes.expense}>
                        <label htmlFor='amount'>Amount</label>
                        <input type='number' id='amount' ref={amountInputref} required />
                    </div>
                    <div className={classes.expense}>
                        <label htmlFor='description'>Description</label>
                        <input type='text' id='description' ref={descriptionInputRef} required />
                    </div>
                    <div className={classes.expense}>
                        <label htmlFor='category'>Category</label>
                        <select id='category' ref={categoryInputRef}>
                            <option value="food">Food</option>
                            <option value="shopping">Shopping</option>
                            <option value="fuel">Fuel</option>
                            <option value="movie">Movie</option>
                            <option value="travelling">Travelling</option>
                        </select>
                    </div>
                    <button onClick={onClickHandler}>Add</button>
                </form>
            </section>
            {showExpenses && <div className={classes['added-expenses']}>
                <div className={classes['expense-heading']}><div>Amount</div><div>Description</div> <div>Category</div></div>
                <ul>
                    {addedExpenses}
                </ul>
            </div>}
        </>
    )
}

export default Expenses;