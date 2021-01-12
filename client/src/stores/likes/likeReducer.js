import * as R from 'ramda';
import { CREATE_USERLIKE, GET_USERLIKES, GET_CURRENTLIKE, DELETE_USERLIKE } from '../types';
import { fetchReducer } from '../../customhooks/useAsync';

function likeReducer(currentState, action) {
   switch (action.type) {
      case GET_USERLIKES:
         return {
            ...currentState,
            userLikes: action.payload.likes
         };
      case GET_CURRENTLIKE:
         return {
            ...currentState,
            currentUserLike: action.payload.like
         };
      case CREATE_USERLIKE:
         return {
            ...currentState,
            currentUserLike: action.payload.like,
            userLikes: [...currentState.userLikes, action.payload.like]
         };
      case DELETE_USERLIKE:
         return {
            ...currentState,
            currentUserLike: null,
            userLikes: R.reject(
               (el) => el.videoId === action.payload.videoId,
               currentState.userLikes
            )
         };
   }
   return fetchReducer(currentState, action);
}

export default likeReducer;
