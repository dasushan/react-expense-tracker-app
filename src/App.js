import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import AuthPage from './components/pages/AuthPage';
import Profile from './components/pages/Profile';
import AuthContext from './components/store/auth-context';
import { useContext } from 'react';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Switch>
        {!authCtx.isLoggedIn && <Route path="/" exact>
          <AuthPage />
        </Route>}
        <Route path="/welcome">
          {authCtx.isLoggedIn && <Welcome />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {authCtx.isLoggedIn && <Profile />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
