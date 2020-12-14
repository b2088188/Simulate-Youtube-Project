import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../stores/auth/authContext';
import Spinner from '../utils/spinner/Spinner';

const PrivateRoute = ({component: Component, ...rest}) => {
	const {isAuth, loading} = useContext(AuthContext);
	if(loading)
		return null;
	return (
     <Route {...rest} render = {props => isAuth? 
     	(<Component {...props} />) : (<Redirect to = "/login" />)}  />
		)
}

export default PrivateRoute;

