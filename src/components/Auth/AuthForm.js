import classes from './AuthForm.module.css';
import { useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIslogin] = useState(true);

  const switchAuthModuleHandler = () => {
    setIslogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let uri = '';
    if (isLogin) {
      uri =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY';
    } else {
      uri =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY';
    }
    fetch(uri, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        if (!isLogin) {
          return res.json().then((data) => {
            history.replace('/welcome');
            authCtx.login(data.idToken)
            console.log('User has successfullt signed up');
          });
        } else {
          return res.json().then((data) => {
            history.replace('/welcome');
            authCtx.login(data.idToken)
            console.log('login');
          });
        }
      } else {
        return res.json().then((data) => {
          // show an error modal
          let errorMessage = 'Authentication failed!';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    });
  };
  return (
    <section className={classes.auth}>
      <p>{isLogin ? 'Login' : 'SignUp'}</p>
      <form className={classes.formwrapper} onSubmit={submitHandler}>
        <div className={classes.fullinput}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.fullinput}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.fullinput}>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              required
              ref={confirmpasswordInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Sign up'}</button>
          {isLogin && <p>Forgot Password</p>}
        </div>
      </form>
      <div className={classes.footer} onClick={switchAuthModuleHandler}>
        {!isLogin && 'Have an account? Login'}
        {isLogin && 'Dont have an account? Sign up'}
      </div>
    </section>
  );
};

export default AuthForm;
