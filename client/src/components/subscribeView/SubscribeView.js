import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Title, List } from '../../design/components';
import { colorGrey, media } from '../../design/utils';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useSubscribeState } from '../../stores/subscriptions/subscribeStateContext';
import { useSubscribeActions } from '../../stores/subscriptions/subscribeActionContext';
import SubscribeItem from './SubscribeItem';
import Spinner from '../../design/elements/Spinner';

const SubscribeView = ({ className }) => {
   const { userSubscriptions, statusUserSubscriptions } = useSubscribeState();
   const { getUserSubscriptions } = useSubscribeActions();
   const { user } = useAuthState();
   useEffect(() => {
      if (user) getUserSubscriptions(user._id);
   }, [user, getUserSubscriptions]);

   function renderSubscriptions(list) {
      return list.map(function generateItem(subscribe) {
         return <SubscribeItem key={subscribe._id} subscribe={subscribe} />;
      });
   }

   if (statusUserSubscriptions === 'idle' || statusUserSubscriptions === 'pending')
      return <Spinner modifiers='white' />;
   if (statusUserSubscriptions === 'resolved')
      return (
         <div className={className}>
            <Title as='h2' className='subscribe__title'>
               Subscriptions
            </Title>
            <nav>
               <List className='subscribe__list'>{renderSubscriptions(userSubscriptions)}</List>
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
