import classes from './UserProfile.module.css'
import {useHistory} from 'react-router-dom'
const UserProfile = () => {
    const history = useHistory();
    
    return(
        <div className={classes.profile}>
            <div className={classes.main}>
                Welcome to Expense Tracker!!!
            </div>
            <div className={classes.actions}>
                <p>Your profile is Incomplete.</p>
                <button onClick={() =>{
                    history.push('/profile')
                    
                }}>Complete Now</button>
            </div>
        </div>
    )
}

export default UserProfile;