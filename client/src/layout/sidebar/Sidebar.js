import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Col, List, Link as SLink, Span, Button, Icon } from 'design/components';
import { setFlex, colorGrey, colorPrimary } from 'design/utils';
import { ThumbUp, Home } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import useAuth from 'context/auth/authContext';
import SubscribeView from 'screen/subscribe/SubscribeView';

const Sidebar = ({ className }) => {
   const [{ user }] = useAuth();
   let location = useLocation();
   let history = useHistory();

   function renderSignIn() {
      return (
         <div className='sign'>
            <Span
               css={`
                  color: ${colorGrey.light1};
                  margin-bottom: 1rem;
               `}
               modifiers={['medium', 'light']}
            >
               Sign in to like videos, comment, and subscribe.
            </Span>
            <Button
               css={`
                  color: ${colorGrey.light1};
               `}
               modifiers='outline'
               onClick={() => history.push('/login')}
            >
               Sign In
            </Button>
         </div>
      );
   }

   if (
      location.pathname === '/signup' ||
      location.pathname === '/login' ||
      location.pathname === '/accounts'
   )
      return null;

   return (
      <Col width='2'>
         <nav className={className}>
            <List
               my={{ desktop: '2.5rem', tabport: '0' }}
               direction={{ desktop: 'column', tabport: 'row' }}
               flexxy={{ tabport: { x: 'center', y: 'center' } }}
            >
               <SideBarItem icon={Home} text='Home' to='/' />
               {user ? <SideBarItem icon={ThumbUp} text='Liked Videos' to='/likelist' /> : null}
            </List>
            {user ? <SubscribeView /> : null}
            {!user ? renderSignIn() : null}
            <div className='legal'>
               <Span
                  modifiers='small'
                  css={`
                     color: ${colorGrey.light1};
                     margin-bottom: 1rem;
                  `}
               >
                  &copy; 2020 by Shunze Lin
               </Span>
            </div>
         </nav>
      </Col>
   );
};

function SideBarItem({ to, icon, text }) {
   return (
      <List.Item flow={{ color: colorPrimary.light }}>
         <SLink
            as={Link}
            to={to}
            css={`
               padding: 1.5rem 3rem;
            `}
            className='link'
         >
            <Icon as={icon} modifiers='medium' />
            <Span modifiers='medium'>{text}</Span>
         </SLink>
      </List.Item>
   );
}

export default styled(Sidebar)`
   height: 100%;
   background-color: ${colorGrey.dark1};
   ${setFlex({ direction: 'column' })}

   .link {
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

   //Legal
   .legal {
      color: ${colorGrey.light4};
      text-align: center;
      padding: 2.5rem;

      @media only screen and (max-width: 56.25em) {
         display: none;
      }
   }
`;
