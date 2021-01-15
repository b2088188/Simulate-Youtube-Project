import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ImageContainer, Link as SLink, Button, Image, Span } from '../../design/components';
import { setFlex, colorGrey, media } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useAuthActions } from '../../stores/auth/authActionContext';
import { Spinner } from '../../design/elements';

const UserNavigation = ({ className }) => {
   const { user, statusAuth, errorAuth } = useAuthState();
   const { logout } = useAuthActions();
   function renderSignIn() {
      return (
         <Fragment>
            <SLink
               as={Link}
               modifiers={['medium', 'round', 'gradient']}
               pdXY={{ x: '1.25rem', y: '1rem' }}
               to='/signup'
            >
               Register
            </SLink>
            <SLink
               as={Link}
               modifiers={['medium', 'round', 'gradient']}
               pdXY={{ x: '1.25rem', y: '1rem' }}
               mg={{ x: '1rem' }}
               to='/login'
            >
               Login
            </SLink>
         </Fragment>
      );
   }
   function renderSignOut(user) {
      return (
         <Fragment>
            <Button modifiers={['medium', 'round', 'gradient']} className='logout' onClick={logout}>
               Logout
            </Button>
            <Link to='/accounts' className='info'>
               <ImageContainer width = {{desktop:'5rem', phone: '4rem'}}>
                  <Image
                     modifiers='round'
                     src={`http://127.0.0.1:8000/${user.photo}`}
                     alt='User image'
                  />
               </ImageContainer>
               <Span className='user__name' modifiers={['medium', 'regular']}>
                  {user.name}
               </Span>
            </Link>
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
      padding: 1.25rem 1rem;
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
      &__name {
         flex: 0 0 40%;
         margin-left: 0.5rem;
         ${media.phone(`
            display: none;
            `)}
      }
   }
`;
