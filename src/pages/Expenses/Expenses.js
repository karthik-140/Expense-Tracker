import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import classes from './Expenses.module.css';

const Expenses = () => {
    const [expenseList, setExpenseList] = useState([]);
    const [showExpenses, setShowExpenses] = useState(false);
    const amountInputref = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    const onClickHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputref.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;
        const expenses = {
            amount: enteredAmount,
            description: enteredDescription,
            category: enteredCategory,
        }
        axios.post('https://expense-tracker-aa33e-default-rtdb.firebaseio.com/expenses.json',expenses)
        setExpenseList([...expenseList, expenses])
        setShowExpenses(true);
        amountInputref.current.value = '';
        descriptionInputRef.current.value = '';
    }

    useEffect(() => {
        axios.get(
            'https://expense-tracker-aa33e-default-rtdb.firebaseio.com/expenses.json'
        ).then((res) => {
            const expenses = Object.values(res.data);
            setShowExpenses(true);
            setExpenseList([...expenses]);
        })
    }, [])

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