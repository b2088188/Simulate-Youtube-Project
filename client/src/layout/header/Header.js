import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import { Link, Icon } from '../../design/components';
import { setFlex, colorNormal } from '../../design/utils';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SearchForm from './SearchForm';
import UserNavigation from './UserNavigation';

const Header = ({ className }) => {
   return (
      <header className={className}>
         <Link as={ReactLink} to='/'>
            <Icon as={YouTubeIcon} modifiers={['big', 'primary']} />
         </Link>
         <SearchForm />
         <UserNavigation />
      </header>
   );
};

export default styled(Header)`
   font-size: 1.4rem;
   height: 10vh;
   background-color: ${colorNormal.white};
   border-bottom: solid 0.1rem var(--color-grey-light-2);
   ${setFlex({ x: 'space-between', y: 'center' })}

   @media only screen and (max-width: 37.5em) {
      flex-wrap: wrap;
      height: 11rem;
      align-content: space-around;
   }

   ////////Input
   &__input {
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      background-color: var(--color-grey-light-2);
      border: none;
      padding: 0.7rem 2rem;
      border-radius: 10rem;
      width: 90%;
      margin-right: -3.25rem;
      transition: all 0.25s;
      @media only screen and (max-width: 37.5em) {
         width: 100%;
      }
      &:focus {
         outline: none;
         width: 100%;
         background-color: var(--color-grey-light-3);
      }
      &::-webkit-input-placeholder {
         font-weight: 100;
         color: var(--color-grey-light-4);
      }
   }
   //////////Button
   &__button {
      border: none;
      border-radius: 0 3rem 3rem 0;
      background-color: var(--color-grey-light-2);
      cursor: pointer;
      &:focus {
         outline: none;
      }
   }
   &__icon {
      color: var(--color-grey-dark-3);
   }
`;
