import * as R from 'ramda';
import { fetchReducer } from '../../customhooks/useAsync';
import { ADD_SUBSCRIBE, DELETE_SUBSCRIBE, GET_SUBSCRIPTIONS, GET_CURRENTSUB } from '../types';

function subscribeReducer(currentState, action) {
   switch (action.type) {
      case GET_SUBSCRIPTIONS:
         return {
            ...currentState,
            userSubs: action.payload.subscribes
         };
      case GET_CURRENTSUB:
         return {
            ...currentState,
            currentUserSub: action.payload.subscribe
         };
      case ADD_SUBSCRIBE:
         return {
            ...currentState,
            currentUserSub: action.payload.subscribe,
            userSubs: [...currentState.userSubs, action.payload.subscribe]
         };
      case DELETE_SUBSCRIBE:
         return {
            ...currentState,
            currentUserSub: null,
            userSubs: R.reject(
               (el) => el.channel._id === action.payload.channelId,
               currentState.userSubs
            )
         };
   }
   return fetchReducer(currentState, action);
}

export default subscribeReducer;
