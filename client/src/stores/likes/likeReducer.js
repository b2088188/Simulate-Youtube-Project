import * as R from 'ramda';
import {
   REQUEST_RESOLVED,
   CREATE_USERLIKE,
   GET_USERLIKES,
   GET_CURRENTLIKE,
   DELETE_USERLIKE
} from '../types';
import { fetchReducer } from '../../customhooks/useAsync';

function likeReducer(currentState, action) {
   switch (action.type) {
      case REQUEST_RESOLVED:
         return {
            ...currentState,
            data: action.payload.data
         };
      case GET_USERLIKES:
         return {
            ...currentState,
            userLikes: currentState.data.likes,
            status: 'resolved'
         };
      case GET_CURRENTLIKE:
         return {
            ...currentState,
            currentUserLike: currentState.data.like,
            status: 'resolved'
         };
      case CREATE_USERLIKE:
         return {
            ...currentState,
            currentUserLike: currentState.data.like,
            userLikes: [...currentState.userLikes, currentState.data.like],
            status: 'resolved'
         };
      case DELETE_USERLIKE:
         return {
            ...currentState,
            currentUserLike: null,
            userLikes: R.reject(
               (el) => el.videoId === action.payload.videoId,
               currentState.userLikes
            ),
            status: 'resolved'
         };
   }
   return fetchReducer(currentState, action);
}

export default likeReducer;
