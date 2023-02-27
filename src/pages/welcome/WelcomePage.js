import { Link } from "react-router-dom";

import classes from './WelcomePage.module.css';

const WelcomePage = () => {
    return (
        <section className={classes.welcome}>
            <h1>Welcome to Expense Tracker!!!</h1>
            <p>Your profile is Incomplete.<Link to="/profile">Complete now</Link></p>
        </section>

    )
}

export default WelcomePage;