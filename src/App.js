import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import AuthPage from './components/pages/AuthPage';
import Profile from './components/pages/Profile';
import AuthContext from './components/store/auth-context';
import { useContext } from 'react';
import Reset from './components/pages/Reset';

import { useSelector } from 'react-redux';
import { getLogInStatus } from './components/store/authSlice';

function App() {
  // const authCtx = useContext(AuthContext);
  const loggedin = useSelector(getLogInStatus)
  console.log(loggedin)
  return (
    <div className="App">
      <Switch>
        {!loggedin && <Route path="/" exact>
          <AuthPage />
        </Route>}
        <Route path="/welcome">
          {loggedin && <Welcome />}
          {!loggedin && <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {loggedin && <Profile />}
          {!loggedin && <Redirect to="/" />}
        </Route>
        <Route path='/reset'>
        <Reset /></Route>
      </Switch>
    </div>
  );
}

export default App;
