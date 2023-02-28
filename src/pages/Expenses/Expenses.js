import { useState } from 'react';

import classes from './Expenses.module.css';

const Expenses = () => {
    const [expenseList, setExpenseList]= useState([]);
    const [showExpenses, setShowExpenses] = useState(false);
    
    const onClickHandler = (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const expenses = {
            amount: amount,
            description: description,
            category: category,
        }
        setExpenseList([...expenseList, expenses])
        setShowExpenses(true);
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
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
                        <input type='number' id='amount' required />
                    </div>
                    <div className={classes.expense}>
                        <label htmlFor='description'>Description</label>
                        <input type='text' id='description' required />
                    </div>
                    <div className={classes.expense}>
                        <label htmlFor='category'>Category</label>
                        <select id='category'>
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