import AuthForm from './components/Auth/AuthForm';
import { Route, Switch } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import AuthPage from './components/pages/AuthPage';
import Profile from './components/pages/Profile';

function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route path='/' exact><AuthPage /></Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/profile"><Profile /></Route>
      </Switch>
      
    </div>
  );
}

export default App;
