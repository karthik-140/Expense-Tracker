import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from './WelcomePage.module.css';
import AuthContext from "../../components/store/auth-context";

const WelcomePage = () => {
    const authCtx = useContext(AuthContext);

    const verifyEmailHandler = () =>{
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAh3QApboOkimKRo0ivTZo1CkZk4ZpFK4I'
        fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: authCtx.token,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                let errorMessage = "Failed to Verify Email";
                throw new Error(errorMessage);
            }
        }).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            alert(err.message);
        })
    }

    return (
        <>
            <section className={classes.welcome}>
                <h1>Welcome to Expense Tracker!!!</h1>
                <p>Your profile is Incomplete.<Link to="/profile">Complete now</Link></p>
            </section>
            <div className={classes.actions}>
                <button onClick={verifyEmailHandler}>Verify Email</button>
            </div>
        </>
    )
}

export default WelcomePage;