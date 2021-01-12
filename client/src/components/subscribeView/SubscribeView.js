import './subscribeview.scss';
import React, { useEffect } from 'react';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useSubscribeState } from '../../stores/subscriptions/subscribeStateContext';
import { useSubscribeActions } from '../../stores/subscriptions/subscribeActionContext';
import SubscribeItem from './SubscribeItem';
import Spinner from '../../design/elements/Spinner';
import axios from 'axios';

const SubscribeView = () => {
   const { userSubscriptions, statusUserSubscriptions, currentUserSub } = useSubscribeState();
   const { getUserSubscriptions } = useSubscribeActions();
   const { user } = useAuthState();
   useEffect(() => {
      if (user) getUserSubscriptions(user._id);
   }, [user]);

   function renderSubscriptions(list) {
      return list.map(function generateItem(subscribe) {
         return <SubscribeItem key={subscribe._id} subscribe={subscribe} />;
      });
   }

   if (statusUserSubscriptions === 'idle' || statusUserSubscriptions === 'pending')
      return <Spinner modifiers='white' />;
   if (statusUserSubscriptions === 'resolved')
      return (
         <div className='subscription'>
            <h2 className='subscription__infotitle'>Subscriptions</h2>
            <nav className='subscription__nav '>
               <ul className='subscription__list'>{renderSubscriptions(userSubscriptions)}</ul>
            </nav>
         </div>
      );
};

export default SubscribeView;
