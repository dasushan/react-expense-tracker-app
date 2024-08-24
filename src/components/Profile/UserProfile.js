import classes from './UserProfile.module.css';
import {useContext} from 'react';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';

const UserProfile = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext)

  const verifyEmailHandler = () => {
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token
        }),
      }
    ).then(async (response) => {
        try{
            const result = await response.json();
        }
        catch(error){
            console.log(error)
        }
    })
  };
  return (
    <>
      <div className={classes.profile}>
        <div className={classes.main}>Welcome to Expense Tracker!!!</div>
        <div className={classes.actions}>
          <p>Your profile is Incomplete.</p>
          <button
            onClick={() => {
              history.push('/profile');
            }}
          >
            Complete Now
          </button>
        </div>
      </div>

      <div className={classes.verify}>
        <button onClick={verifyEmailHandler}>Verify Email Id</button>
      </div>
    </>
  );
};

export default UserProfile;
