import React, {useContext, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useAuthState} from '../../stores/auth/authStateContext';
import Spinner from '../../utils/spinner/Spinner';


const UserNavigation = () => {
	const {user, statusAuth, errorAuth} = useAuthState();
  
  function renderSignIn() {
  	return (
  		<Fragment>  			
    			<Link className="user-nav__btn" to = "/signup">
			     	Register
		     	 </Link>	
		     	<Link className="user-nav__btn" to = "/login">
		     		Login
		     	</Link>		
  		</Fragment>
  		)
  }

  function renderSignOut(user) {
  	return (	
  		<Fragment>
		     	<button className="user-nav__btn">
		     		Logout
		     	</button>		
		     	<Link to = "/accounts" className = "user-nav__info">
		     		<img  className = "user-nav__infophoto" src = {require(`../../../../public/assets/users/${user.photo}`).default} alt="User image" />
		     		<span  className = "user-nav__infoname">{user.name}</span>
		     	</Link>
     	</Fragment>
  		)
  }
    
  	

	return (
		<Fragment>			
		     <nav className="user-nav">
			         {user ? renderSignOut(user) : renderSignIn()} 	
		     </nav>
		</Fragment>
		)
}

export default UserNavigation;