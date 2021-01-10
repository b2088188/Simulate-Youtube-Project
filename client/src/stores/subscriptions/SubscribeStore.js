import * as R from 'ramda';
import React, { useReducer, useMemo, useCallback } from 'react';
import { SubscribeStateProvider } from './subscribeStateContext';
import { SubscribeActionProvider } from './subscribeActionContext';
import subscribeReducer from './subscribeReducer';
import axios from 'axios';
import {
   LOADING,
   ADD_SUBSCRIBE,
   DELETE_SUBSCRIBE,
   GET_SUBSCRIPTIONS,
   SET_SUBSCRIBESTATUS,
} from '../types';
import useAsync from '../../customhooks/useAsync';

const SubscribeStore = ({ children }) => {
   const [stateUserSubs, fetchUserSubs] = useAsync({
      data: [],
   });
   const [stateCurrentSub, fetchCurrentSub] = useAsync({
      data: {},
   });

   const getUserSubscriptions = useCallback(
      async function (userId) {
         fetchUserSubs(axios.get(`/api/v1/users/${userId}/subscriptions`));
      },
      [fetchUserSubs]
   );

   const getCurrentSubscribe = useCallback(
      async function (userId, channelId) {
         fetchCurrentSub(
            axios.get(`/api/v1/users/${userId}/subscriptions/${channelId}`)
         );
      },
      [fetchCurrentSub]
   );

   const createSubscribe = useCallback(
      async function (userId, channel) {
         fetchCurrentSub(
            axios.post(`/api/v1/users/${userId}/subscriptions`, { channel })
         );
      },
      [fetchCurrentSub]
   );

   const deleteSubscribe = useCallback(
      async function (userId, channelId) {
         fetchCurrentSub(
            axios.delete(`/api/v1/users/${userId}/subscriptions/${channelId}`)
         );
      },
      [fetchCurrentSub]
   );

   const value = useMemo(
      () => ({
         userSubscriptions: stateUserSubs.data.subscribes,
         statusUserSubscriptions: stateUserSubs.status,
         errorUserSubscriptions: stateUserSubs.error,
         currentSubscribe: stateCurrentSub.data.subscribe,
         stateCurrentSubscribe: stateCurrentSub.status,
         errorCurrentSubscribe: stateCurrentSub.error,
      }),
      [stateUserSubs, stateCurrentSub]
   );

   const actions = useMemo(
      () => ({
         getUserSubscriptions,
         getCurrentSubscribe,
         createSubscribe,
         deleteSubscribe,
      }),
      [
         getUserSubscriptions,
         getCurrentSubscribe,
         createSubscribe,
         deleteSubscribe,
      ]
   );

   return (
      <SubscribeStateProvider value={value}>
         <SubscribeActionProvider value={actions}>
            {children}
         </SubscribeActionProvider>
      </SubscribeStateProvider>
   );
};

export default SubscribeStore;
