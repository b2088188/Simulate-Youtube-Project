import React from 'react';
import styled from 'styled-components';
import { useSubscribeItems } from 'utils/subscription';
import { Title, List } from 'design/components';
import { colorGrey, media } from 'design/utils';
import { useAuthState } from 'stores/auth/authStateContext';
import SubscribeItem from './SubscribeItem';
import Spinner from 'design/elements/Spinner';

const SubscribeView = ({ className }) => {
   const { user } = useAuthState();
   const { subscribeItems, isIdle, isLoading, isSuccess } = useSubscribeItems(user._id);

   function renderSubscriptions(list) {
      return list.map(function generateItem(subscribe) {
         return <SubscribeItem key={subscribe._id} subscribe={subscribe} />;
      });
   }

   if (isIdle || isLoading) return <Spinner modifiers='white' />;
   if (isSuccess)
      return (
         <div className={className}>
            <Title as='h2' className='subscribe__title'>
               Subscriptions
            </Title>
            <nav>
               <List className='subscribe__list'>{renderSubscriptions(subscribeItems)}</List>
            </nav>
         </div>
      );
};

export default styled(SubscribeView)`
   border-top: solid 0.1rem #fff;
   padding: 2rem 1rem;
   margin-bottom: auto;
   ${media.tabport(`
padding: 1rem;
      `)}
   .subscribe {
      &__list {
         ${media.tabport(`
       display: flex;
      `)}
      }
      &__title {
         color: ${colorGrey.light1};
      }
   }
`;
