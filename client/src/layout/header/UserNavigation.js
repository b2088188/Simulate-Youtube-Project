import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ImageContainer, Link as SLink, Button, Image, Span } from 'design/components';
import { setFlex, colorGrey, media } from 'design/utils';
import useAuth from 'context/auth/authContext';
import { Spinner } from 'components/Spinner';

const UserNavigation = ({ className }) => {
   const [{ user, statusAuth }, { logout }] = useAuth();
   function renderSignIn() {
      return (
         <Fragment>
            <SLink
               as={Link}
               modifiers={['medium', 'round', 'gradient']}
               className='user__button'
               to='/signup'
            >
               Register
            </SLink>
            <SLink
               as={Link}
               modifiers={['medium', 'round', 'gradient']}
               className='user__button'
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
               <ImageContainer width={{ desktop: '5rem', phone: '4rem' }}>
                  <Image
                     modifiers='round'
                     src={`${process.env.REACT_APP_BACKEND_URL}/${user.photo}`}
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
      &__button {
         padding: 1rem 1.25rem;
      }
   }
`;
