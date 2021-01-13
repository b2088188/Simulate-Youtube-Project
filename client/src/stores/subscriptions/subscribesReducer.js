import * as R from 'ramda';
import { fetchReducer } from '../../customhooks/useAsync';
import {
   REQUEST_RESOLVED,
   ADD_SUBSCRIBE,
   DELETE_SUBSCRIBE,
   GET_SUBSCRIPTIONS,
   GET_CURRENTSUB
} from '../types';

function subscribeReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data
         };
      case GET_SUBSCRIPTIONS:
         return {
            ...currentState,
            userSubs: currentState.data.subscribes,
            status: 'resolved'
         };
      case GET_CURRENTSUB:
         return {
            ...currentState,
            currentUserSub: currentState.data.subscribe,
            status: 'resolved'
         };
      case ADD_SUBSCRIBE:
         return {
            ...currentState,
            currentUserSub: currentState.data.subscribe,
            userSubs: [...currentState.userSubs, currentState.data.subscribe],
            status: 'resolved'
         };
      case DELETE_SUBSCRIBE:
         return {
            ...currentState,
            currentUserSub: null,
            userSubs: R.reject(
               (el) => el.channel._id === action.payload.channelId,
               currentState.userSubs
            ),
            status: 'resolved'
         };
   }
   return fetchReducer(currentState, action);
}

export default subscribeReducer;
