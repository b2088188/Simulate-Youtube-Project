import './sidebar.scss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useLocation, useHistory } from 'react-router-dom';
import {useAuthState} from '../../stores/auth/authStateContext';
import SubscribeView from '../../components/subscribeView/SubscribeView';


const Sidebar = () => {
    const { user } = useAuthState();
    let location = useLocation();
    let history = useHistory();
    if (location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/accounts')
        return null;

    function renderSignIn() {
        return (
            <div className="sidebar__sign">
              <h3 className = "sidebar__signinfo">Sign in to like videos, comment, and subscribe.</h3>
              <button className="sidebar__signbtn" onClick = {() => history.push('/login')}>
                  Sign In
              </button>
          </div>
        )
    }

    function renderAuthItem() {
        return (
            <li className="side-nav__item">
                <Link to="/likelist" className="side-nav__link">
                    <Icon name='thumbs up'   size = 'large' />
                    <span className = "side-nav__text">Liked Videos</span>
                </Link>                
            </li>
        )
    }

    return (
        <nav className = "sidebar">
          <ul className="side-nav">
            <li className="side-nav__item">
                <Link to="/" className="side-nav__link">
                    <Icon name='home'   size = 'large' />
                    <span className = "side-nav__text">Home</span>
                </Link>                
            </li>
            {user ? 
            renderAuthItem() :
            null}
          </ul>
             {user ? 
             <SubscribeView /> : 
            null}
              {!user ? 
              renderSignIn() : 
              null}
          <div className="legal">
            &copy; 2020 by Shunze Lin
          </div>    
        </nav>
    )
}

export default Sidebar;