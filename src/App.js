import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Layout/Header';
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import WelcomePage from './pages/welcome/WelcomePage';
import AuthContext from './components/store/auth-context';
import ProfilePage from './pages/profile/ProfilePage';

function App() {
  const authCtx = useContext(AuthContext);
  return (
      <Switch>
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
      </Switch>
  );
}

export default App;
