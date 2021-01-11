import React, { useContext, Fragment } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import { Link, Button, Image, Span } from '../../design/components';
import { setFlex, colorGrey } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { Spinner } from '../../design/elements';

const UserNavigation = ({ className }) => {
   const { user, statusAuth, errorAuth } = useAuthState();

   function renderSignIn() {
      return (
         <Fragment>
            <Link
               as={ReactLink}
               modifiers={['medium', 'round', 'gradient']}
               pd={{ x: '1.25rem', y: '1rem' }}
               to='/signup'
            >
               Register
            </Link>
            <Link
               as={ReactLink}
               modifiers={['medium', 'round', 'gradient']}
               pd={{ x: '1.25rem', y: '1rem' }}
               mg={{ x: '1rem' }}
               to='/login'
            >
               Login
            </Link>
         </Fragment>
      );
   }
   function renderSignOut(user) {
      return (
         <Fragment>
            <Button className='logout'>Logout</Button>
            <ReactLink to='/accounts' className='info'>
               <div className='user__imgbox'>
                  <Image
                     modifiers='round'
                     src={`http://127.0.0.1:8000/${user.photo}`}
                     alt='User image'
                  />
               </div>
               <Span className='user__name' modifiers={['medium', 'regular']}>
                  {user.name}
               </Span>
            </ReactLink>
         </Fragment>
      );
   }

   return (
      <nav className={className}>
         {statusAuth === 'pending' ? (
            <Spinner modifiers='dark' />
         ) : user ? (
            renderSignOut(user)
         ) : (
            renderSignIn()
         )}
      </nav>
   );
};

export default styled(UserNavigation)`
   flex: 0 0 15%;
   ${setFlex({ y: 'center' })}
   .logout {
      flex: 0 0 40%;
      margin-right: 0.5rem;
   }
   .info {
      flex: 0 0 50%;
      ${setFlex({ y: 'center' })}
      margin-right: 2rem;
      text-decoration: none;
      color: ${colorGrey.dark1};
   }
   .user {
      &__imgbox {
         flex: 0 0 40%;
      }
      &__name {
         flex: 0 0 40%;
         margin-left: 0.5rem;
      }
   }
`;
