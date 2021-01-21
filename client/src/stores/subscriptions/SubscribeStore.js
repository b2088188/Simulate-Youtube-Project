import React, { useMemo, useCallback } from 'react';
import { SubscribeStateProvider } from './subscribeStateContext';
import { SubscribeActionProvider } from './subscribeActionContext';
import subscribesReducer from './subscribesReducer';
import { userRequest } from '../../apis/backend';
import { ADD_SUBSCRIBE, DELETE_SUBSCRIBE, GET_SUBSCRIPTIONS, GET_CURRENTSUB } from '../types';
import useAsync from '../../customhooks/useAsync';

const SubscribeStore = ({ children }) => {
   const [stateUserSubs, fetchUserSubs, dispatchUserSubs] = useAsync(
      {
         data: [],
         userSubs: [],
         currentUserSub: null
      },
      subscribesReducer
   );

   const getUserSubscriptions = useCallback(
      async function (userId) {
         const { status } = await fetchUserSubs(userRequest.get(`/${userId}/subscriptions`));
         if (status === 'success') dispatchUserSubs({ type: GET_SUBSCRIPTIONS });
      },
      [fetchUserSubs, dispatchUserSubs]
   );

   const getCurrentSubscribe = useCallback(
      async function (userId, channelId) {
         const { status } = await fetchUserSubs(
            userRequest.get(`/${userId}/subscriptions/${channelId}`)
         );
         if (status === 'success') dispatchUserSubs({ type: GET_CURRENTSUB });
      },
      [fetchUserSubs, dispatchUserSubs]
   );

   const createSubscribe = useCallback(
      async function (userId, channel) {
         const { status } = await fetchUserSubs(userRequest.post(`/${userId}/subscriptions`));
         if (status === 'success') dispatchUserSubs({ type: ADD_SUBSCRIBE });
      },
      [fetchUserSubs, dispatchUserSubs]
   );

   const deleteSubscribe = useCallback(
      async function (userId, channelId) {
         await fetchUserSubs(userRequest.delete(`/${userId}/subscriptions/${channelId}`));
         dispatchUserSubs({ type: DELETE_SUBSCRIBE, payload: { channelId } });
      },
      [fetchUserSubs, dispatchUserSubs]
   );

   const value = useMemo(
      () => ({
         userSubscriptions: stateUserSubs.userSubs,
         statusUserSubscriptions: stateUserSubs.status,
         errorUserSubscriptions: stateUserSubs.error,
         currentUserSub: stateUserSubs.currentUserSub
      }),
      [stateUserSubs]
   );

   const actions = useMemo(
      () => ({
         getUserSubscriptions,
         getCurrentSubscribe,
         createSubscribe,
         deleteSubscribe
      }),
      [getUserSubscriptions, getCurrentSubscribe, createSubscribe, deleteSubscribe]
   );

   return (
      <SubscribeStateProvider value={value}>
         <SubscribeActionProvider value={actions}>{children}</SubscribeActionProvider>
      </SubscribeStateProvider>
   );
};

export default SubscribeStore;
