import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Layout/Header';
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import WelcomePage from './pages/welcome/WelcomePage';
import AuthContext from './components/store/auth-context';
import ProfilePage from './pages/profile/ProfilePage';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import Expenses from './pages/Expenses/Expenses';

function App() {
  const authCtx = useContext(AuthContext);
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
        {authCtx.isLoggedIn && <WelcomePage />}
        {!authCtx.isLoggedIn && <Redirect to="/auth" />}
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      {authCtx.isLoggedIn && <Route path="/expenses">
        <Header />
        <Expenses />
      </Route>}
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
