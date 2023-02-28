import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import classes from './WelcomePage.module.css';
import AuthContext from "../../components/store/auth-context";

const WelcomePage = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const verifyEmailHandler = () => {
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAh3QApboOkimKRo0ivTZo1CkZk4ZpFK4I'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: authCtx.token,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                let errorMessage = "Failed to Verify Email";
                throw new Error(errorMessage);
            }
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const logoutHandler = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        history.replace('/auth');
    }

    return (
        <>
            <section className={classes.welcome}>
                <h1>Welcome to Expense Tracker!!!</h1>
                <div className={classes['actions-logout']}>
                    <p>Your profile is Incomplete.<Link to="/profile">Complete now</Link></p>
                    <button onClick={logoutHandler}>Logout</button>
                </div>
            </section>
            <div className={classes.actions}>
                <button onClick={verifyEmailHandler}>Verify Email</button>
            </div>
        </>
    )
}

export default WelcomePage;