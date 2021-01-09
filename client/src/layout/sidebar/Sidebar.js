import React, { useContext } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  Col,
  List,
  Link,
  Span,
  Button,
  Title,
  Icon,
} from '../../design/components';
import { setFlex, colorGrey, colorPrimary } from '../../design/utils';
import { ThumbUp, Home } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuthState } from '../../stores/auth/authStateContext';
import SubscribeView from '../../components/subscribeView/SubscribeView';

const Sidebar = ({ className }) => {
  const { user } = useAuthState();
  let location = useLocation();
  let history = useHistory();
  if (
    location.pathname === '/signup' ||
    location.pathname === '/login' ||
    location.pathname === '/accounts'
  )
    return null;

  function renderSignIn() {
    return (
      <div className='sign'>
        <Span modifiers={['medium', 'light']} className='info'>
          Sign in to like videos, comment, and subscribe.
        </Span>
        <Button modifiers='outline' onClick={() => history.push('/login')}>
          Sign In
        </Button>
      </div>
    );
  }

  function renderAuthItem() {
    return (
      <List.Item flow={{ color: colorPrimary.light }}>
        <Link
          as={ReactLink}
          to='/likelist'
          pd={{ x: '3rem', y: '1.5rem' }}
          className='link'
        >
          <Icon as={ThumbUp} modifiers='medium' />
          <Span modifiers='medium'>Liked Videos</Span>
        </Link>
      </List.Item>
    );
  }

  return (
    <Col col_2>
      <nav className={className}>
        <List className='list'>
          <List.Item flow={{ color: colorPrimary.light }}>
            <Link
              as={ReactLink}
              pd={{ x: '3rem', y: '1.5rem' }}
              className='link'
              to='/'
            >
              <Icon as={Home} modifiers='medium' />
              <Span modifiers='medium'>Home</Span>
            </Link>
          </List.Item>
          {user ? renderAuthItem() : null}
        </List>
        {user ? <SubscribeView /> : null}
        {!user ? renderSignIn() : null}
        <div className='legal'>
          <Span modifiers='small' className='info'>
            &copy; 2020 by Shunze Lin
          </Span>
        </div>
      </nav>
    </Col>
  );
};

export default styled(Sidebar)`
  height: 100%;
  background-color: ${colorGrey.dark1};
  ${setFlex({ direction: 'column' })}
  .list {
    margin: 3.5rem 0;
    @media only screen and (max-width: 56.25em) {
        display: flex;
        margin: 0;
    }
  }
}

.link{
        z-index: 2;
        position: relative;
        color: ${colorGrey.light1};
        ${setFlex({ y: 'center' })}
}


.sign {
        margin-top: 5rem;
        margin-bottom: auto;        
        
        ${setFlex({ direction: 'column', y: 'center' })}
        @media only screen and (max-width: 56.25em) {
            margin: 2rem 0;
        }
    }


.info{
    color: ${colorGrey.light1};
    margin-bottom: 1rem;
}


//Legal
.legal {
    color: ${colorGrey.light4};
    text-align: center;
    padding: 2.5rem;

    @media only screen and (max-width: 56.25em) {
        display: none;
    }

`;
