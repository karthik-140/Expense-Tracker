//import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Header from './components/Layout/Header';
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import WelcomePage from './pages/welcome/WelcomePage';
//import AuthContext from './components/store/auth-context';
import ProfilePage from './pages/profile/ProfilePage';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import Expenses from './pages/Expenses/Expenses';
import { authActions } from './components/store/authSlice';

function App() {
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const userEmail = useSelector(state => state.auth.email);
  const userToken = useSelector(state => state.auth.token);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      dispatch(authActions.login({ email: email, token: token }))
    }
  }, [dispatch])

  useEffect(() => {
    console.log("useeffect called");
    if (isLoggedIn) {
      localStorage.setItem('email', userEmail);
      localStorage.setItem('token', userToken);
      console.log("useffect fectching")
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      console.log("useeffect remove")
    }
  }, [isLoggedIn, userEmail, userToken])

  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/auth' />
      </Route>
      <Route path="/auth">
        <Header />
        <ExpenseForm />
      </Route>
      <Route path="/welcome">
        {/* {authCtx.isLoggedIn && <WelcomePage />}
        {!authCtx.isLoggedIn && <Redirect to="/auth" />} */}
        <WelcomePage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      {/* {authCtx.isLoggedIn && <Route path="/expenses">
        <Header />
        <Expenses />
      </Route>} */}
      <Route path="/expenses">
        <Header />
        <Expenses />
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
