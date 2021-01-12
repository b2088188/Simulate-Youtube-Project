import * as R from 'ramda';
import React, { useReducer, useMemo, useCallback } from 'react';
import { SubscribeStateProvider } from './subscribeStateContext';
import { SubscribeActionProvider } from './subscribeActionContext';
import subscribeReducer from './subscribeReducer';
import axios from 'axios';
import { ADD_SUBSCRIBE, DELETE_SUBSCRIBE, GET_SUBSCRIPTIONS, GET_CURRENTSUB } from '../types';
import useAsync from '../../customhooks/useAsync';

const SubscribeStore = ({ children }) => {
   const [stateUserSubs, fetchUserSubs, dispatchUserSubs] = useAsync(
      {
         data: [],
         userSubs: [],
         currentUserSub: null
      },
      subscribeReducer
   );

   const getUserSubscriptions = useCallback(
      async function (userId) {
         const { data, status } = await fetchUserSubs(
            axios.get(`/api/v1/users/${userId}/subscriptions`)
         );
         if (status === 'success')
            dispatchUserSubs({ type: GET_SUBSCRIPTIONS, payload: { subscribes: data.subscribes } });
      },
      [fetchUserSubs, dispatchUserSubs]
   );

   const getCurrentSubscribe = useCallback(
      async function (userId, channelId) {
         const { data, status } = await fetchUserSubs(
            axios.get(`/api/v1/users/${userId}/subscriptions/${channelId}`)
         );
         if (status === 'success')
            dispatchUserSubs({ type: GET_CURRENTSUB, payload: { subscribe: data.subscribe } });
      },
      [fetchUserSubs, dispatchUserSubs]
   );

   const createSubscribe = useCallback(
      async function (userId, channel) {
         const { data, status } = await fetchUserSubs(
            axios.post(`/api/v1/users/${userId}/subscriptions`, { channel })
         );
         if (status === 'success')
            dispatchUserSubs({ type: ADD_SUBSCRIBE, payload: { subscribe: data.subscribe } });
      },
      [fetchUserSubs, dispatchUserSubs]
   );

   const deleteSubscribe = useCallback(
      async function (userId, channelId) {
         await fetchUserSubs(axios.delete(`/api/v1/users/${userId}/subscriptions/${channelId}`));
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
