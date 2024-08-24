import { useRef, useContext} from 'react';
import AuthContext from '../store/auth-context';
import classes from './ProfileForm.module.css';
const ProfileForm = () => {
  const nameInputRef = useRef();
  const urlInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUrl = urlInputRef.current.value;
    console.log(authCtx.token)
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            idToken: authCtx.token,
            displayName: enteredName,
            photoUrl: enteredUrl,
            returnSecureToken: false
        })
    }).then( async (response) => {
        const result = await response.json();
        console.log(result)
    })

  }
  return (
    <section>
      <header className={classes.header}>
        <div className={classes.main}>
          Winners never quit, Quitters never win.
        </div>
        <div className={classes.actions}>
          Your Profile is <b>64%</b> completed. A completed Profile has higher
          chances of landing a job.
          <button>Complete Now</button>
        </div>
      </header>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.title}>
          <header>Contact Details</header>
          <button>Cancel</button>
        </div>
        <section className={classes.formbody}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required ref={nameInputRef}/>
          </div>
          <div>
            <label htmlFor="url">Profile Photo URL</label>
            <input type="url" id="url" required ref={urlInputRef}/>
          </div>
        </section>

        <button type='submit'>Update</button>
      </form>
    </section>
  );
};

export default ProfileForm;
