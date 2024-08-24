import { useRef } from "react";
import classes from './Reset.module.css'
import { useHistory } from "react-router-dom";
const Reset = () => {
    const emailInputRef = useRef();
    const history = useHistory();

    const submitHandler =(event) => {
         event.preventDefault();
         const enteredEmail = emailInputRef.current.value;

         fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredEmail
            })
         }).then(async (response) => {
            const result = await response.json();
            history.push('/')
         })
    }
  return (
    <section className={classes.reset}>
      <div>
        <h1>Reset Password</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' required ref={emailInputRef}/>
        </div>
        <div>
            <button>Reset Password</button>
        </div>
      </form>
    </section>
  );
};

export default Reset;