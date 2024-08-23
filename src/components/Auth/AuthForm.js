import classes from './AuthForm.module.css';
import { useRef } from 'react';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY',{
        method: 'POST',
        body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then((res) => {
        
        if(res.ok){
            return res.json().then(data => {
                console.log('User has successfullt signed in')
            }) 
            
        } else{
            return res.json().then(data => {
                // show an error modal
                let errorMessage = 'Authentication failed!';
                if(data && data.error && data.error.message){
                    errorMessage = data.error.message;
                }
                alert(errorMessage)
            })
        }
    })
  };
  return (
    <section className={classes.auth}>
      <p>Sign Up</p>
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
        <div className={classes.fullinput}>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            required
            ref={confirmpasswordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Sign Up</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
