import './header.scss';
import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { Icon } from 'semantic-ui-react';
import SearchForm from './SearchForm';
import UserNavigation from './UserNavigation';

const Header = () => {
   // const {loadUser} = useContext(AuthContext);
   // useEffect(() => {
   //   loadUser();
   // }, [])
	let location = useLocation();	
    // if(location.pathname ==='/signup')
    // 	return null;
	return (
     <header className = "header">        
        <Link to = "/">            
     	<Icon name='youtube' className = "youtube__icon" size = 'huge' />
        </Link>
     	<SearchForm />
     	<UserNavigation />
     </header>
		)
}

export default Header;