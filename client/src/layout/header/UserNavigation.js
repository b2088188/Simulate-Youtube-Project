import React, {useContext, Fragment} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../stores/auth/authContext';
import Spinner from '../../utils/spinner/Spinner';


const UserNavigation = () => {
	const {isAuth, user, logout, loading} = useContext(AuthContext);
  
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
  	console.log(user)
  	return (	
  		<Fragment>
		     	<button className="user-nav__btn" onClick = {logout}>
		     		Logout
		     	</button>		
		     	<Link to = "/accounts" className = "user-nav__info">
		     		<img  className = "user-nav__infophoto" src = {require(`../../../../public/assets/users/${user.photo}`).default} alt="User image" />
		     		<span  className = "user-nav__infoname">{user.name}</span>
		     	</Link>
     	</Fragment>
  		)
  }
    if(loading)
    	return <Spinner />

	return (
		<Fragment>			
		     <nav className="user-nav">
			         {isAuth ? renderSignOut(user) : renderSignIn()} 	
		     </nav>
		</Fragment>
		)
}

export default UserNavigation;