import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import AuthPage from './components/pages/AuthPage';
import Profile from './components/pages/Profile';
// import AuthContext from './components/store/auth-context';
// import { useContext } from 'react';
import Greeting from './components/Greeting';

import Reset from './components/pages/Reset';

import { useSelector } from 'react-redux';
import { getLogInStatus } from './components/store/authSlice';
import { getThemeStatus, toggle } from './components/store/themeSlice';
import { store } from './components/store';
function App() {
  const loggedin = useSelector(getLogInStatus);
  const isDark = useSelector(getThemeStatus);

  const clickHandler = () => {
    store.dispatch(toggle());
    //dispatch(toggle())  --- why does it not work
  };

  return (
    <div className="App" data-color-mode={isDark ? 'dark' : 'light'}>
      <button onClick={clickHandler}>Theme Toggler</button>
      <Greeting />
        <Switch>
          {!loggedin && (
            <Route path="/" exact>
              <AuthPage />
            </Route>
          )}
          <Route path="/welcome">
            {loggedin && <Welcome />}
            {!loggedin && <Redirect to="/" />}
          </Route>
          <Route path="/profile">
            {loggedin && <Profile />}
            {!loggedin && <Redirect to="/" />}
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
        </Switch>
      
    </div>
  );
}

export default App;
