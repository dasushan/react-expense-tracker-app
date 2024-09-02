import classes from './UserProfile.module.css';

import { useHistory } from 'react-router-dom';

import Expenses from '../Expenses/Expenses';

import { useDispatch, useSelector } from 'react-redux';
import { logout, getAuthToken } from '../store/authSlice';


const UserProfile = () => {
  const history = useHistory();
  

  const dispatch = useDispatch();
  const token = useSelector(getAuthToken)
  console.log(token);

  const verifyEmailHandler = () => {
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBKniczVLNJrXICnBbwj2W29ttGPgAtKCY',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: token,
        }),
      }
    ).then(async (response) => {
      try {
        const result = await response.json();
      } catch (error) {
        console.log(error);
      }
    });
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
          <button
            onClick={() => {
              dispatch(logout())
              history.replace('/');
            }}
          >
            Log out
          </button>
        </div>
      </div>

      <div className={classes.verify}>
        <button onClick={verifyEmailHandler}>Verify Email Id</button>
      </div>

      <Expenses />
    </>
  );
};

export default UserProfile;
